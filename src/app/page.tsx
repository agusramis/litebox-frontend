import { Box } from '@chakra-ui/react';
import { HomeTemplateClient } from '@/components/templates/HomeTemplateClient';
import { fetchPosts } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home - LiteBox Tech Blog',
    description: 'Browse the latest technology articles and insights',
    openGraph: {
        title: 'Home - LiteBox Tech Blog',
        description: 'Browse the latest technology articles and insights',
    },

};

export default async function HomePage() {
    const initialLimit = 9;
    const data = await fetchPosts(0, initialLimit, undefined, { next: { revalidate: 60 } });
    const initialPosts = data.data;
    const total = data.meta.pagination.total;

    const topicSet = new Set<string>();
    initialPosts.forEach(p => {
        const topic = p.attributes.topic;
        if (topic) topicSet.add(topic);
    });
    const topics = ['All', ...Array.from(topicSet)];

    const featured = initialPosts[0];
    const posts = initialPosts.slice(1);

    return (
        <Box bg="brand.black" minH="100vh" >
            <HomeTemplateClient featured={featured} posts={posts} topics={topics} total={total} />
        </Box>
    );
}
