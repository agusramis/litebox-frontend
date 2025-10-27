import { Container, Box, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function LoadingPostPage() {
    return (
        <Container maxW="container.lg" py={12}>
            <Box>
                <Skeleton height="60px" mb={6} />

                <Skeleton height="600px" mb={8} borderRadius="xl" />

                <SkeletonText mt={4} noOfLines={4} mb={4} />
                <SkeletonText mt={4} noOfLines={6} mb={4} />
                <SkeletonText mt={4} noOfLines={4} mb={8} />

                <Skeleton height="40px" mb={6} width="200px" />
                <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} height="300px" borderRadius="md" />
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
