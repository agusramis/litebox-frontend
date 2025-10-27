import { Textarea as ChakraTextarea, type TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface TextareaProps extends Omit<ChakraTextareaProps, 'invalid'> {
    invalid?: boolean;
}

export const TextareaA = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ invalid, ...props }, ref) => {
        return (
            <ChakraTextarea
                ref={ref}
                borderRadius="lg"
                borderColor={invalid ? 'semantic.error' : 'black'}
                borderWidth="1px"
                _focus={{
                    boxShadow: '0 0 0 3px rgba(13, 110, 253, 0.3)',
                    borderColor: 'brand.primary',
                }}
                _invalid={{
                    borderColor: 'semantic.error',
                }}
                _disabled={{
                    bg: 'brand.gray.100',
                    opacity: 0.6,
                    cursor: 'not-allowed',
                    boxShadow: 'none',
                }}
                invalid={invalid}
                {...props}
            />
        );
    }
);

TextareaA.displayName = 'TextareaA';


