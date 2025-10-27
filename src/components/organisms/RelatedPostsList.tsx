'use client';

import { Box, Flex } from '@chakra-ui/react';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { PostCard } from '@/components/molecules/PostCard';
import { NewPostModal } from './NewPostModal';
import type { Post } from '@/lib/types';

export const RelatedPostsList = ({ relatedPosts }: { relatedPosts: Post[] }) => {
    if (!relatedPosts || relatedPosts.length === 0) {
        return (
            <Box mt={12} px={6}>
                <Flex justify="space-between" align="center" mb={6}>
                    <Heading as="h2" size="lg">
                        Related Posts
                    </Heading>
                    <NewPostModal topButton={false} />
                </Flex>
                <Text>No related posts available.</Text>
            </Box>
        );
    }

    return (
        <Flex flexDir={"column"} px={6} alignItems={{ sm: "start", md: "center" }}>
            <Flex justify="space-around" align="center" w="full" mb={6}>
                <Heading as="h2" size="lg">
                    Related Posts
                </Heading>
                <NewPostModal topButton={false} />
            </Flex>
            <Box overflow={"auto"}>
                <Flex
                    height="378px"
                    gap={6}
                    w={'max-content'}
                >
                    {relatedPosts.map(post => (
                        <PostCard key={post.id} post={post} variant="compact" w={{ base: '238px', lg: '341px' }} />
                    ))}
                </Flex>
            </Box>
        </Flex>
    );
};
