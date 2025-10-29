'use client';

import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, Flex, Text, Box, CloseButton } from '@chakra-ui/react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { LoaderBar } from './LoaderBar';
import { ArrowRightIcon } from '@/app/icons/ArrowRigthIcon';
import { toaster } from '@/components/ui/toaster';
import { createRelatedPostAction } from '@/app/actions/posts';
import { CrossIcon } from '@/app/icons/CrossIcon';
import { ArrowUpIcon } from '@/app/icons/ArrowUpIcon';
import { Heading } from '../atoms/Heading';

type ModalState = 'idle' | 'loading' | 'error' | 'success';

type FormValues = {
    title: string;
    image: FileList | null;
};

export const NewPostModal = ({ topButton = true }: { topButton?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<ModalState>('idle');
    const [progress, setProgress] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        setError,
        clearErrors,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: { title: '', image: null },
        mode: 'onSubmit',
    });

    const imageFiles = watch('image');
    const selectedFileName = imageFiles?.[0]?.name;

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (data: FormValues) => {
        const file = data.image?.[0];
        if (!file) {
            setError('image', { type: 'required', message: 'Please upload an image' });
            return;
        }

        setState('loading');
        setProgress(0);

        try {
            for (let i = 0; i <= 100; i += 10) {
                await new Promise((resolve) => setTimeout(resolve, 150));
                setProgress(i);
            }

            const formData = new FormData();
            formData.append('title', data.title.trim());
            formData.append('image', file);

            await createRelatedPostAction(formData);

            setState('success');
            toaster.create({
                title: 'Success!',
                description: 'Post created successfully',
                type: 'success',
            });
        } catch (error) {
            console.error('Failed to create related post:', error);
            setState('error');
            setError('image', { type: 'server', message: 'Failed to upload your file' });
        }
    };

    const handleClose = () => {
        if (state !== 'loading') {
            setIsOpen(false);
            setTimeout(() => {
                setState('idle');
                setProgress(0);
                reset();
                clearErrors();
            }, 300);
        }
    };

    const handleRetry = () => {
        setState('idle');
        setProgress(0);
        clearErrors();
    };

    const handleDone = () => {
        setIsOpen(false);
        setTimeout(() => {
            setState('idle');
            setProgress(0);
            reset();
            clearErrors();
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

            <Dialog.Root open={isOpen} onOpenChange={(details) => !details.open && handleClose()}>
                <Dialog.Backdrop />
                <Dialog.Positioner >
                    <Dialog.Content
                        bg="brand.green"
                        outline="3px solid"
                        outlineColor="brand.black"
                        padding={{ base: 10, md: 10 }}
                        borderRadius={0}
                        maxWidth={{ base: '330px', lg: '640px' }}
                        boxShadow={" 10px 10px 0px 0px #000000"}

                    >
                        <Flex justify="flex-end" padding="10px">
                            <CrossIcon
                                boxSize="48px"
                                color="brand.black"
                                onClick={handleClose}
                                aria-label="Close modal"
                            />
                        </Flex>
                        <Flex flexDir={"column"} gap={{ base: 4 }}>
                            {state === 'idle' && (
                                <>
                                    <Flex flexDir="column" gap={{ base: 2 }} alignItems={"center"} textAlign={"center"}>
                                        <Text
                                            textStyle={"headingMedium"}
                                            color="#240F35"

                                        >
                                            Upload your post
                                        </Text>
                                        <Text
                                            textStyle={"bodyRegular"}
                                            color="#595959"

                                        >
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.
                                        </Text>
                                    </Flex>
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <Flex flexDir={"column"} gap="8">
                                            <Flex flexDir={"column"} gap="4">
                                                <Box textAlign={"center"} alignItems={"center"}>
                                                    <FormField
                                                        id="post-title"
                                                        label=""
                                                        errorText={errors.title?.message}
                                                        alignItems={"center"}

                                                    >
                                                        <Input
                                                            placeholder="Post Title"
                                                            {...register('title', {
                                                                required: 'Title is required',
                                                                validate: (v) =>
                                                                    v.trim().length > 0 || 'Title is required',
                                                            })}
                                                            invalid={!!errors.title}
                                                            maxW={{ base: '100%', md: '400px' }}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.value) {
                                                                    clearErrors('title');
                                                                }
                                                            }}
                                                        />
                                                    </FormField>
                                                </Box>

                                                <Box textAlign={"center"}>
                                                    <Controller
                                                        name="image"
                                                        control={control}
                                                        rules={{ required: 'Please upload an image' }}
                                                        render={({ field: { onChange, ref } }) => (
                                                            <>
                                                                <input
                                                                    ref={(node) => {
                                                                        ref(node);
                                                                        fileInputRef.current = node;
                                                                    }}
                                                                    type="file"
                                                                    accept="image/*"
                                                                    style={{ display: 'none' }}
                                                                    onChange={(e) => {
                                                                        onChange(e.target.files);
                                                                        clearErrors('image');
                                                                    }}

                                                                />
                                                                <Button
                                                                    variant="secondary"
                                                                    onClick={handleFileButtonClick}
                                                                    w="full"
                                                                    maxW={{ base: '100%', md: '400px' }}
                                                                    type="button"
                                                                    h="56px"
                                                                    textStyle={"buttonMedium"}

                                                                >
                                                                    Upload image <ArrowUpIcon size="lg" />
                                                                </Button>
                                                                {(selectedFileName || errors.image) && (
                                                                    <Text
                                                                        color={errors.image ? 'red.600' : 'brand.black'}
                                                                    >
                                                                        {errors.image?.message || `Selected: ${selectedFileName}`}
                                                                    </Text>
                                                                )}
                                                            </>
                                                        )}
                                                    />
                                                </Box>
                                            </Flex>
                                            <Flex justify="center" gap={4}>
                                                <Button
                                                    variant="black"
                                                    type="submit"
                                                    w="full"
                                                    h="56px"
                                                    textStyle={"buttonMedium"}
                                                    maxW={{ base: '100%', md: '132px' }}

                                                    isLoading={isSubmitting}
                                                >
                                                    Confirm
                                                </Button>
                                            </Flex>
                                        </Flex>

                                    </form>
                                </>)}

                            {(state === 'loading' || state === 'error') && (
                                <Flex textAlign={"center"} flexDir={"column"} alignItems={"center"} gap="10">
                                    <Input
                                        value={watch('title') || ''}
                                        disabled
                                        style={{ opacity: 0.6 }}
                                        maxW={{ base: '100%', md: '400px' }}

                                    />
                                    <Box
                                        w={{ base: '100%', lg: '400px' }}
                                    >
                                        <LoaderBar
                                            state={getLoaderState()}
                                            value={progress}
                                            onCancel={() => {
                                                setState('idle');
                                                setProgress(0);
                                            }}
                                            onRetry={handleRetry}
                                            onDone={handleDone}
                                        />
                                    </Box>
                                    {state === 'loading' && (
                                        <Button variant="black" disabled isLoading w="full"
                                            h="56px"
                                            textStyle={"buttonMedium"}
                                            maxW={{ base: '100%', md: '132px' }}
                                        >
                                            Confirm
                                        </Button>
                                    )}
                                    {state === 'error' && (
                                        <Button
                                            variant="black"
                                            w="full"
                                            onClick={handleSubmit(onSubmit)}
                                            h="56px"
                                            textStyle={"buttonMedium"}
                                            maxW={{ base: '100%', md: '132px' }}
                                        >
                                            Confirm
                                        </Button>
                                    )}
                                </Flex>
                            )}

                            {state === 'success' && (
                                <Flex alignItems="center" flexDir={"column"} textAlign={"center"} gap={"12"}>
                                    <Heading textStyle="headingMedium" color="brand.black">
                                        Your post was successfully uploaded!
                                    </Heading>
                                    <Button variant="black" onClick={handleDone} w="full"
                                        h="56px"
                                        textStyle={"buttonMedium"}
                                        maxW={{ base: '100%', md: '132px' }}
                                    >
                                        Done
                                    </Button>
                                </Flex>
                            )}

                        </Flex>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root >
        </>
    );
};