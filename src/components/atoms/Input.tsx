import {
    Input as ChakraInput,
    InputGroup,
    type InputProps as ChakraInputProps,
} from '@chakra-ui/react';
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
                <InputGroup
                    startAddon={leftAddon}
                    endAddon={rightAddon}
                >
                    <ChakraInput
                        ref={ref}
                        borderRadius={0}
                        p="8px 16px"
                        borderColor={invalid ? 'semantic.error' : 'black'}
                        borderWidth="1px"
                        textStyle={"bodyMedium"}
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
                        aria-invalid={invalid || undefined}
                        {...props}
                    />
                </InputGroup>
            );
        }

        return (
            <ChakraInput
                ref={ref}
                borderRadius={0}
                p="8px 16px"
                h="56px"
                borderColor={invalid ? 'semantic.error' : 'black'}
                borderWidth="1px"
                color="brand.black"
                bg="brand.white"
                textStyle={"bodyMedium"}
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
                aria-invalid={invalid || undefined}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

