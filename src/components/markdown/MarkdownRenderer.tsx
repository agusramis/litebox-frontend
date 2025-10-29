'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Image, type BoxProps, Flex } from '@chakra-ui/react';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
    return (
        <Flex
            flexDir={"column"}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children, ...props }) => (
                        <Heading
                            as="h1"
                            color="brand.black"
                            textStyle="headingBoldLg"
                            {...props}
                        >
                            {children}
                        </Heading>
                    ),
                    h2: ({ children, ...props }) => (
                        <Heading
                            as="h2"
                            {...props}
                        >
                            {children}
                        </Heading>
                    ),
                    h3: ({ children, ...props }) => (
                        <Heading
                            as="h3"
                            {...props}
                        >
                            {children}
                        </Heading>
                    ),
                    p: ({ children, ...props }) => (
                        <Text
                            textStyle={"bodyRegularSm"}
                            mb={4}
                            color="brand.gray.dark"
                            {...props}
                        >
                            {children}
                        </Text>
                    ),
                    img: ({ src, alt }) => (
                        <Box
                            my={{ base: 4 }}
                            borderRadius="xl"
                            overflow="hidden"
                            w="100%"
                        >
                            <Image
                                src={typeof src === 'string' ? src : ''}
                                alt={typeof alt === 'string' ? alt : ''}
                                borderRadius="xl"
                                width="100%"
                                height="auto"
                                objectFit="cover"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                }}
                            />
                        </Box>
                    ),
                    blockquote: ({ children, ...props }) => (
                        <Box
                            as="blockquote"
                            borderLeft="4px solid"
                            borderColor="brand.green"
                            pl={{ base: 3, md: 4 }}
                            py={{ base: 2, md: 3 }}
                            my={{ base: 4, md: 6 }}
                            mx={{ base: 4, md: 8 }}
                            color="brand.black"
                            textStyle="headingBoldLg"
                            css={{
                                '& *': {
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    lineHeight: 'inherit',
                                    color: 'inherit',
                                },
                                '& p': { margin: 0 }, // quita margen del p adentro del quote
                            }}
                        >

                            {children}
                        </Box>
                    ),
                    ul: ({ children, ...props }) => (
                        <Box
                            as="ul"
                            pl={{ base: 4, md: 6 }}
                            mb={{ base: 3, md: 4 }}
                            fontSize={{ base: "sm", md: "md" }}
                            {...(props as BoxProps)}
                        >
                            {children}
                        </Box>
                    ),
                    ol: ({ children, ...props }) => (
                        <Box
                            as="ol"
                            pl={{ base: 4, md: 6 }}
                            mb={{ base: 3, md: 4 }}
                            fontSize={{ base: "sm", md: "md" }}
                            {...(props as BoxProps)}
                        >
                            {children}
                        </Box>
                    ),
                    li: ({ children }) => (
                        <Box
                            as="li"
                            mb={{ base: 1.5, md: 2 }}
                            color="brand.gray.dark"
                            lineHeight={{ base: "1.6", md: "1.8" }}
                        >
                            {children}
                        </Box>
                    ),
                    code: ({ children, ...props }) => (
                        <Box
                            as="code"
                            bg="gray.100"
                            px={{ base: 1, md: 2 }}
                            py={{ base: 0.5, md: 1 }}
                            borderRadius="sm"
                            fontSize={{ base: "xs", md: "sm" }}
                            fontFamily="mono"
                            {...(props as BoxProps)}
                        >
                            {children}
                        </Box>
                    ),
                    pre: ({ children, ...props }) => (
                        <Box
                            as="pre"
                            bg="gray.900"
                            color="white"
                            p={{ base: 3, md: 4 }}
                            borderRadius="md"
                            overflow="auto"
                            my={{ base: 4, md: 6 }}
                            fontSize={{ base: "xs", md: "sm" }}
                            {...(props as BoxProps)}
                        >
                            {children}
                        </Box>
                    ),
                    a: ({ children, ...props }) => (
                        <a>
                            <Box
                                as="a"
                                textDecoration="underline"
                                textStyle={"bodyRegularSm"}
                                color="brand.black"
                                _hover={{
                                    color: "brand.green",
                                }}
                                {...(props as BoxProps)}
                            >
                                {children}
                            </Box></a>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </Flex>
    );
};
