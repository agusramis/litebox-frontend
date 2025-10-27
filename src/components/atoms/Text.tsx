import { Text as ChakraText, type TextProps } from '@chakra-ui/react';

export const Text = (props: TextProps) => (
    <ChakraText
        fontWeight="400"
        color="brand.gray.dark"
        lineHeight="1.6"
        {...props}
    />
);
