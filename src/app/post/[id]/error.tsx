'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container, Box } from '@chakra-ui/react';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';

export default function ErrorPostPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Post page error:', error);
    }, [error]);

    return (
        <Container maxW="container.lg" py={12}>
            <Box textAlign="center" py={20}>
                <Heading as="h1" size="2xl" mb={4}>
                    Something went wrong
                </Heading>
                <Text fontSize="lg" mb={8}>
                    We couldn&apos;t load this post. Please try again.
                </Text>
                <Box display="flex" gap={4} justifyContent="center">
                    <Button onClick={reset}>Try Again</Button>
                    <Link href="/">
                        <Button variant="secondary">
                            Go Home
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

