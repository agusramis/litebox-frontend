import { Input as ChakraInput, InputGroup, InputAddon, type InputProps as ChakraInputProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface InputProps extends Omit<ChakraInputProps, 'invalid'> {
    invalid?: boolean;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ invalid, leftAddon, rightAddon, ...props }, ref) => {
        if (leftAddon || rightAddon) {
            return (
                <InputGroup.Root>
                    {leftAddon && (
                        <InputAddon.Root placement="start">
                            <InputAddon.Indicator />
                            {leftAddon}
                        </InputAddon.Root>
                    )}
                    <ChakraInput
                        ref={ref}
                        borderRadius="lg"
                        borderColor={invalid ? 'semantic.error' : 'black'}
                        borderWidth="1px"
                        _focus={{
                            boxShadow: '0 0 0 3px rgba(13, 110, 253, 0.3)',
                            borderColor: 'brand.primary',
                        }}
                        _disabled={{
                            bg: 'brand.gray.100',
                            opacity: 0.6,
                            cursor: 'not-allowed',
                            boxShadow: 'none',
                        }}
                        {...props}
                    />
                    {rightAddon && (
                        <InputAddon.Root placement="end">
                            <InputAddon.Indicator />
                            {rightAddon}
                        </InputAddon.Root>
                    )}
                </InputGroup.Root>
            );
        }

        return (
            <ChakraInput
                ref={ref}
                borderRadius="lg"
                borderColor={invalid ? 'semantic.error' : 'black'}
                borderWidth="1px"
                _focus={{
                    boxShadow: '0 0 0 3px rgba(13, 110, 253, 0.3)',
                    borderColor: 'brand.primary',
                }}
                _disabled={{
                    bg: 'brand.gray.100',
                    opacity: 0.6,
                    cursor: 'not-allowed',
                    boxShadow: 'none',
                }}
                style={invalid ? { borderColor: 'var(--chakra-colors-semantic-error)' } : undefined}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

