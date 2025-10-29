import { Text as ChakraText, type TextProps } from '@chakra-ui/react';

export const Text = (props: TextProps) => (
    <ChakraText
        as={props.as ?? 'span'}
        {...props}
    />
);
