'use client';

import { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    VStack,
    HStack,
    Text,
    Box,
    CloseButton,
} from '@chakra-ui/react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { LoaderBar, type LoaderState } from './LoaderBar';
import { useUploadPost } from '@/lib/hooks/useUploadPost';

export interface UploadPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: (payload: { title: string; file: File }) => Promise<void>;
}

type ModalState = 'idle' | 'loading' | 'success';

export const UploadPostModal = ({ isOpen, onClose, onConfirm }: UploadPostModalProps) => {
    const [state, setState] = useState<ModalState>('idle');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [errorText, setErrorText] = useState<string | undefined>();
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { upload } = useUploadPost();

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setState('idle');
                setTitle('');
                setFile(null);
                setErrorText(undefined);
                setProgress(0);
            }, 300);
        }
    }, [isOpen]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setErrorText(undefined);
        }
    };

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleConfirm = async () => {
        // Validation
        if (!title.trim()) {
            setErrorText('Post title is required');
            return;
        }

        if (!file) {
            setErrorText('Please upload an image');
            return;
        }

        setErrorText(undefined);
        setState('loading');
        setProgress(0);

        try {
            if (onConfirm) {
                await onConfirm({ title, file });
            } else {
                // Use the hook if onConfirm is not provided
                await upload({ title, file, onProgress: setProgress });
            }
            setState('success');
        } catch (error) {
            console.error('Failed to upload post from modal:', error);
            setState('idle');
            setErrorText('Failed to upload post. Please try again.');
        }
    };

    const handleClose = () => {
        if (state !== 'loading') {
            onClose();
        }
    };

    const getLoaderState = (): LoaderState => {
        if (state === 'loading') return 'loading';
        if (state === 'success') return 'success';
        return 'idle';
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(details) => !details.open && handleClose()}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content
                    bg="brand.green"
                    border="4px solid"
                    borderColor="brand.black"
                    borderRadius="md"
                    maxW="640px"
                    maxH="518px"
                    width="100%"
                >
                    <Dialog.Header flexDir="column" gap={2}>
                        <HStack justify="space-between" w="full">
                            <Dialog.Title fontSize="xl" fontWeight="bold" color="brand.black">
                                Upload your post
                            </Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" color="brand.black" _hover={{ bg: 'brand.black', color: 'brand.white' }} />
                            </Dialog.CloseTrigger>
                        </HStack>
                        <Dialog.Description fontSize="sm" color="brand.black">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.
                        </Dialog.Description>
                    </Dialog.Header>

                    <Dialog.Body>
                        <VStack gap={4} align="stretch">
                            {state === 'idle' && (
                                <>
                                    <FormField
                                        id="post-title"
                                        label="Post Title"
                                        errorText={errorText}
                                        helperText={errorText ? undefined : 'Enter a title for your post'}
                                    >
                                        <Input
                                            placeholder="Post Title"
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                                setErrorText(undefined);
                                            }}
                                            invalid={!!errorText}
                                        />
                                    </FormField>

                                    <Box>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <Button variant="black" size="lg" onClick={handleFileButtonClick} w="full">
                                            Upload image ↑
                                        </Button>
                                        {file && (
                                            <Text fontSize="sm" color="brand.black" mt={2}>
                                                Selected: {file.name}
                                            </Text>
                                        )}
                                    </Box>
                                </>
                            )}

                            {state === 'loading' && (
                                <Box>
                                    <FormField id="post-title-loading" label="Post Title">
                                        <Input value={title} disabled />
                                    </FormField>
                                    <LoaderBar
                                        state={getLoaderState()}
                                        value={progress}
                                        onCancel={() => {
                                            setState('idle');
                                            setProgress(0);
                                        }}
                                    />
                                </Box>
                            )}

                            {state === 'success' && (
                                <Box textAlign="center" py={8}>
                                    <Text fontSize="lg" fontWeight="bold" color="brand.black" mb={4}>
                                        Your post was successfully uploaded!
                                    </Text>
                                </Box>
                            )}
                        </VStack>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <HStack gap={4} w="full" justify="flex-end">
                            {state === 'idle' && (
                                <>
                                    <Button variant="ghost" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="black" onClick={handleConfirm}>
                                        Confirm
                                    </Button>
                                </>
                            )}
                            {state === 'loading' && (
                                <>
                                    <Button variant="ghost" onClick={handleClose} disabled>
                                        Cancel
                                    </Button>
                                    <Button variant="black" onClick={handleConfirm} disabled isLoading>
                                        Confirm
                                    </Button>
                                </>
                            )}
                            {state === 'success' && (
                                <Button variant="black" onClick={handleClose}>
                                    Done
                                </Button>
                            )}
                        </HStack>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};
