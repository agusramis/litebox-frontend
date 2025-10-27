import Link from 'next/link';
import { Container, Box } from '@chakra-ui/react';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';

export default function NotFound() {
    return (
        <Container maxW="container.lg" py={12}>
            <Box textAlign="center" py={20}>
                <Heading as="h1" size="2xl" mb={4}>
                    Post Not Found
                </Heading>
                <Text fontSize="lg" mb={8}>
                    The post you&apos;re looking for doesn&apos;t exist or has been removed.
                </Text>
                <Link href="/">
                    <Button>
                        Go Home
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}

