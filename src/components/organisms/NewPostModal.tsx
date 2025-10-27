'use client';

import { useState, useRef } from 'react';
import { Dialog, Flex, Text, Box, CloseButton } from '@chakra-ui/react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { LoaderBar } from './LoaderBar';
import { ArrowRightIcon } from '@/app/icons/ArrowRigthIcon';
import { createRelatedPost } from '@/lib/api';
import { toaster } from '@/components/ui/toaster';

type ModalState = 'idle' | 'loading' | 'error' | 'success';

export const NewPostModal = ({ topButton = true }: { topButton?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<ModalState>('idle');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [errorText, setErrorText] = useState<string | undefined>();
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (!title.trim()) {
            setErrorText('Help Text');
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
            for (let i = 0; i <= 100; i += 10) {
                await new Promise((resolve) => setTimeout(resolve, 150));
                setProgress(i);
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', file);

            await createRelatedPost(formData);

            setState('success');
            toaster.create({
                title: 'Success!',
                description: 'Post created successfully',
                type: 'success',
            });
        } catch (error) {
            console.error('Failed to create related post:', error);
            setState('error');
            setErrorText('Failed to upload your file');
        }
    };

    const handleClose = () => {
        if (state !== 'loading') {
            setIsOpen(false);
            setTimeout(() => {
                setState('idle');
                setTitle('');
                setFile(null);
                setErrorText(undefined);
                setProgress(0);
            }, 300);
        }
    };

    const handleRetry = () => {
        setState('idle');
        setErrorText(undefined);
        setProgress(0);
    };

    const handleDone = () => {
        setIsOpen(false);
        setTimeout(() => {
            setState('idle');
            setTitle('');
            setFile(null);
            setErrorText(undefined);
            setProgress(0);
        }, 300);
    };

    const getLoaderState = () => {
        if (state === 'loading') return 'loading';
        if (state === 'error') return 'error';
        if (state === 'success') return 'success';
        return 'idle';
    };

    return (
        <>
            <Flex
                as="button"
                align="center"
                gap={2}
                onClick={() => setIsOpen(true)}
                fontSize="md"
                fontWeight="medium"
                color={topButton ? 'brand.white' : 'brand.black'}
                _hover={{ opacity: 0.7 }}
                transition="opacity 0.2s ease"
                cursor="pointer"
            >
                New post
                <ArrowRightIcon boxSize="20px" color={topButton ? 'brand.green' : 'brand.purple'} />
            </Flex>

            <Dialog.Root open={isOpen} onOpenChange={(details) => !details.open && handleClose()}>                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg="brand.green"
                        border="4px solid"
                        borderColor="brand.black"
                        borderRadius="md"
                        maxW={{ base: '90%', sm: '640px' }}
                        padding={{ base: 8, md: 10 }}
                    >
                        <Box p={6}>
                            <Flex justify="flex-end" mb={4}>
                                <CloseButton
                                    size="md"
                                    color="brand.black"
                                    onClick={handleClose}
                                    aria-label="Close modal"
                                />
                            </Flex>

                            <Text
                                fontSize="35px"
                                fontWeight="bold"
                                color="brand.black"
                                textAlign="center"
                                mb={2}
                                lineHeight="1.2"
                            >
                                Upload your post
                            </Text>

                            <Text
                                fontSize="sm"
                                color="brand.gray.dark"
                                textAlign="center"
                                mb={6}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                commodo libero.
                            </Text>

                            {state === 'idle' && (
                                <>
                                    <Box mb={4}>
                                        <FormField
                                            id="post-title"
                                            label=""
                                            errorText={errorText}
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
                                    </Box>

                                    <Box mb={6}>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <Button variant="secondary" size="lg" onClick={handleFileButtonClick} w="full">
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

                            {(state === 'loading' || state === 'error' || state === 'success') && (
                                <Box mb={6}>
                                    <Input value={title} disabled style={{ opacity: 0.6 }} />
                                    <Box mt={4}>
                                        <LoaderBar
                                            state={getLoaderState()}
                                            value={progress}
                                            onCancel={() => setState('idle')}
                                            onRetry={handleRetry}
                                            onDone={handleDone}
                                        />
                                    </Box>
                                </Box>
                            )}

                            {state === 'success' && (
                                <Box textAlign="center" mb={6}>
                                    <Text fontSize="lg" fontWeight="bold" color="brand.black">
                                        Your post was successfully uploaded!
                                    </Text>
                                </Box>
                            )}

                            <Flex justify="center" gap={4}>
                                {state === 'idle' && (
                                    <Button variant="black" onClick={handleConfirm} w="full">
                                        Confirm
                                    </Button>
                                )}
                                {state === 'loading' && (
                                    <Button variant="black" onClick={handleConfirm} disabled isLoading w="full">
                                        Confirm
                                    </Button>
                                )}
                                {state === 'error' && (
                                    <Button variant="black" onClick={handleConfirm} w="full">
                                        Confirm
                                    </Button>
                                )}
                                {state === 'success' && (
                                    <Button variant="black" onClick={handleDone} w="full">
                                        Done
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    );
}
