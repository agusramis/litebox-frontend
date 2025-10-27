'use client';

import NextLink from 'next/link';
import { Box, Container, Flex, Link } from '@chakra-ui/react';
import { Image } from '@/components/atoms/Image';
import { NewPostModal } from '@/components/organisms/NewPostModal';

export const Navbar = () => {
    return (
        <Box
            as="header"
            bg="brand.black"
            position="sticky"
            top={0}
            zIndex={1000}
            w="100%"
        >
            <Container px={{ base: 6, md: 16 }} py={{ base: 4, md: 4 }} w={"100%"} margin={0} maxW={"unset"}>
                <Flex align="center" justify="space-between" gap={4}>
                    <Link
                        as={NextLink}
                        href="/"
                        display="inline-flex"
                        alignItems="center"
                        gap={3}
                        _hover={{ textDecoration: 'none', opacity: 0.9 }}
                        flexShrink={0}
                    >
                        <Box
                            width={{ base: 120, md: 178 }}
                            height={{ base: 19, md: "28px" }}
                        >
                            <Image
                                src="/Logo.svg"
                                alt="LiteTech icon"
                                width={178}
                                height={28}
                            />
                        </Box>
                    </Link>
                    <Box flexShrink={0}>
                        <NewPostModal />
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};
