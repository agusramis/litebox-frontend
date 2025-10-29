import { Box, Heading, Skeleton } from '@chakra-ui/react';
import { Suspense } from 'react';
import { RelatedPostsList } from '../organisms/RelatedPostsList';
import { getRelatedPosts } from '@/lib/api';
import { Text } from '@/components/atoms/Text';

export const RelatedPostsTemplate = async () => {
    try {
        const relatedPosts = await getRelatedPosts(3);
        return (
            <Box py={{ base: 10, lg: 16 }} overflow={"auto"}>
                <Suspense
                    fallback={
                        <Box>
                            <Heading as="h2" size="lg">
                                Related Posts
                            </Heading>
                            <Box>
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} height="500px" borderRadius="md" />
                                ))}
                            </Box>
                        </Box>
                    }
                >
                    <RelatedPostsList relatedPosts={relatedPosts} />
                </Suspense>
            </Box>
        )
    } catch {
        return (
            <Box mt={12}>
                <Heading as="h2" size="lg">
                    Related Posts
                </Heading>
                <Text color="red.500">Error Getting Related Posts</Text>
            </Box>
        )
    }
}
