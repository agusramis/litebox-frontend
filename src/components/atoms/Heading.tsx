import { Heading as ChakraHeading, type HeadingProps } from '@chakra-ui/react';

export const Heading = (props: HeadingProps) => (
    <ChakraHeading
        fontWeight="700"
        color="brand.black"
        lineHeight="1.2"
        {...props}
    />
);
