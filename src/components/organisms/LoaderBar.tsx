import { HStack, Box, Text, Progress as ChakraProgress } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export type LoaderState = 'idle' | 'loading' | 'error' | 'success';

export interface LoaderBarProps {
    state: LoaderState;
    label?: string;
    value?: number;
    onCancel?: () => void;
    onRetry?: () => void;
    onDone?: () => void;
}

const defaultLabels: Record<Exclude<LoaderState, 'idle'>, string> = {
    loading: 'Loading image',
    error: 'Failed to upload your file',
    success: 'Upload successful',
};

export const LoaderBar = ({ state, label, value = 0, onCancel, onRetry, onDone }: LoaderBarProps) => {
    if (state === 'idle') return null;

    const displayLabel = label || defaultLabels[state];

    return (
        <Box>
            {state === 'loading' && (
                <Box>
                    <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" color="brand.black">
                            {displayLabel} {value}%
                        </Text>
                        {onCancel && (
                            <Text
                                fontSize="sm"
                                color="brand.black"
                                cursor="pointer"
                                onClick={onCancel}
                                _hover={{ textDecoration: 'underline' }}
                            >
                                Cancel
                            </Text>
                        )}
                    </HStack>
                    <ChakraProgress.Root
                        value={value}
                        h="8px"
                    >
                        <ChakraProgress.Track bg="brand.gray.light" borderRadius="sm">
                            <ChakraProgress.Range bg="brand.black" />
                        </ChakraProgress.Track>
                    </ChakraProgress.Root>
                </Box>
            )}

            {state === 'error' && (
                <Box>
                    <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" color="semantic.error">
                            {displayLabel}
                        </Text>
                        {onRetry && (
                            <Text
                                fontSize="sm"
                                color="brand.black"
                                cursor="pointer"
                                onClick={onRetry}
                                _hover={{ textDecoration: 'underline' }}
                            >
                                Retry
                            </Text>
                        )}
                    </HStack>
                    <ChakraProgress.Root
                        value={100}
                        h="8px"
                    >
                        <ChakraProgress.Track bg="semantic.error" borderRadius="sm">
                            <ChakraProgress.Range bg="semantic.error" />
                        </ChakraProgress.Track>
                    </ChakraProgress.Root>
                </Box>
            )}

            {state === 'success' && (
                <Box>
                    <HStack gap={2} mb={2}>
                        <Text fontSize="sm" color="brand.black">
                            {displayLabel}
                        </Text>
                        <CheckIcon color="brand.black" />
                    </HStack>
                    <ChakraProgress.Root
                        value={100}
                        h="8px"
                    >
                        <ChakraProgress.Track bg="brand.black" borderRadius="sm">
                            <ChakraProgress.Range bg="brand.black" />
                        </ChakraProgress.Track>
                    </ChakraProgress.Root>
                    {onDone && (
                        <HStack justify="flex-end" mt={2}>
                            <Text
                                fontSize="sm"
                                color="brand.black"
                                cursor="pointer"
                                onClick={onDone}
                                _hover={{ textDecoration: 'underline' }}
                            >
                                Done
                            </Text>
                        </HStack>
                    )}
                </Box>
            )}
        </Box>
    );
};

