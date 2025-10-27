'use client';

import { Box, Flex, Container, Text, HStack, Link, } from '@chakra-ui/react';
import { Image } from '@/components/atoms/Image';
import { LinkedInIcon } from '@/app/icons/LinkedInIcon';
import { FacebookIcon } from '@/app/icons/FacebookIcon';
import { XIcon } from '@/app/icons/XIcon';
import { Tooltip } from '@/components/ui/tooltip';


export const Footer = () => {
    return (
        <Box as="footer" bg="brand.purple" py={{ base: 8, md: 12 }} mt="auto">
            <Container maxW="none" px={{ base: 6, md: 16 }}>
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align={{ base: 'center', md: 'center' }}
                    gap={6}
                    textAlign={{ base: 'center', md: 'left' }}
                >
                    <Flex
                        direction="column"
                        gap={{ base: 4, md: 3 }}
                        align={{ base: 'center', md: 'flex-start' }}
                    >
                        <Flex align="center" gap={2}>
                            <Image src="/Logo.svg" alt="Lite-tech icon" width={24} height={24} />
                        </Flex>

                        <HStack display={{ base: 'flex', md: 'none' }} gap={6} justify="center">
                            <Tooltip content="Visit our LinkedIn" >
                                <Link
                                    href="https://www.linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit our LinkedIn"
                                    _hover={{ opacity: 0.7 }}
                                    transition="opacity 0.2s ease"
                                    cursor="pointer"
                                >
                                    <LinkedInIcon size="lg" color="brand.white" />
                                </Link>
                            </Tooltip>
                            <Tooltip content="Visit our Facebook" >
                                <Link
                                    href="https://www.facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit our Facebook"
                                    _hover={{ opacity: 0.7 }}
                                    transition="opacity 0.2s ease"
                                    cursor="pointer"
                                >
                                    <FacebookIcon size="lg" color="brand.white" />
                                </Link>
                            </Tooltip>
                            <Tooltip content="Visit our X profile" >
                                <Link
                                    href="https://www.x.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit our X profile"
                                    _hover={{ opacity: 0.7 }}
                                    transition="opacity 0.2s ease"
                                    cursor="pointer"
                                >
                                    <XIcon size="lg" color="brand.white" />
                                </Link>
                            </Tooltip>
                        </HStack>

                        <Text fontSize={{ base: 'sm', md: 'md' }} color="brand.gray.light">
                            © Copyright Lite-Tech
                        </Text>
                        <Text fontSize={{ base: 'sm', md: 'md' }} color="brand.gray.light">
                            All Rights Reserved
                        </Text>
                    </Flex>

                    <HStack gap={6} display={{ base: 'none', md: 'flex' }}>
                        <Tooltip content="Visit our LinkedIn" >
                            <Link
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our LinkedIn"
                                _hover={{ opacity: 0.7 }}
                                transition="opacity 0.2s ease"
                                cursor="pointer"
                            >
                                <LinkedInIcon size="lg" color="brand.white" />
                            </Link>
                        </Tooltip>
                        <Tooltip content="Visit our Facebook" >
                            <Link
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Facebook"
                                _hover={{ opacity: 0.7 }}
                                transition="opacity 0.2s ease"
                                cursor="pointer"
                            >
                                <FacebookIcon size="lg" color="brand.white" />
                            </Link>
                        </Tooltip>
                        <Tooltip content="Visit our X profile">
                            <Link
                                href="https://www.x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our X profile"
                                _hover={{ opacity: 0.7 }}
                                transition="opacity 0.2s ease"
                                cursor="pointer"
                            >
                                <XIcon size="lg" color="brand.white" />
                            </Link>
                        </Tooltip>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};
