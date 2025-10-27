'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Container, Grid, GridItem, Box, Button, useBreakpointValue, Flex } from '@chakra-ui/react';
import { FeaturedHero } from '@/components/molecules/FeaturedHero';
import { HomeGrid } from '@/components/templates/HomeGrid';
import { Text } from '@/components/atoms/Text'
import type { Post } from '@/lib/types';
import { fetchPosts } from '@/lib/api';
import { NewsletterCTA } from '../organisms/NewsletterCTA';
import { MostViewed } from '../organisms/MostViewedItem';
import { TopicsFilter } from '../organisms/TopicsFilter';

interface HomeTemplateClientProps {
    featured: Post;
    posts: Post[];
    topics: string[];
    total: number;
}

export const HomeTemplateClient = ({ featured, posts: initialPosts, topics, total }: HomeTemplateClientProps) => {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const [offset, setOffset] = useState(initialPosts.length);
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [mostViewedPosts, setMostViewedPosts] = useState<Post[]>([]);
    const [loadingMostViewed, setLoadingMostViewed] = useState(true);

    const itemsPerPage = useBreakpointValue({ base: 5, md: 9 }) ?? 9;
    const prevItemsPerPage = useRef(itemsPerPage);

    useEffect(() => {
        if (prevItemsPerPage.current !== itemsPerPage) {
            async function resetAndFetch() {
                setLoading(true);
                try {
                    const data = await fetchPosts(0, itemsPerPage + 1);
                    const resetPosts = data.data.slice(1);
                    setPosts(resetPosts);
                    setOffset(data.data.length);
                    setHasMore(data.data.length < total);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                } finally {
                    setLoading(false);
                }
            }
            resetAndFetch();
            prevItemsPerPage.current = itemsPerPage;
        }
    }, [itemsPerPage, total]);

    async function handleLoadMore() {
        if (loading) return;
        setLoading(true);
        try {
            const data = await fetchPosts(offset, itemsPerPage);
            setPosts(prev => [...prev, ...data.data]);
            const newOffset = offset + itemsPerPage;
            setOffset(newOffset);
            setHasMore(newOffset < total);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }

    function toggleTopic(topics: string[]) {
        if (topics.find(((topic) => topic === 'All'))) {
            setSelectedTopics([]);
        } else {
            setSelectedTopics(topics);
        }
    }

    const filteredPosts = useMemo(() => {
        if (selectedTopics.length === 0) {
            return posts;
        }
        return posts.filter(p => selectedTopics.includes(p.attributes.topic));
    }, [selectedTopics, posts]);

    useEffect(() => {
        async function loadMostViewed() {
            setLoadingMostViewed(true);
            try {
                const data = await fetchPosts(0, 4);
                setMostViewedPosts(data.data);
            } catch (error) {
                console.error('Error fetching most viewed posts:', error);
            } finally {
                setLoadingMostViewed(false);
            }
        }
        loadMostViewed();
    }, []);

    const mostViewedItems = useMemo(() => {
        return mostViewedPosts.map((post) => ({
            id: post.id,
            title: post.attributes.title,
            href: `/post/${post.id}`,
            imageUrl: post.attributes.coverImg.data.attributes.url || '',
            imageAlt: post.attributes.coverImg.data.attributes.name || post.attributes.title,
        }));
    }, [mostViewedPosts]);

    return (
        <>
            <Container maxW={{ base: '100%', lg: '1400px' }} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
                <Box mb={{ base: 6, md: 8 }}>
                    <FeaturedHero post={featured} />
                </Box>
                <Grid templateColumns={{ base: '1fr', lg: '1fr 360px' }} gap={8} alignItems="start">
                    <GridItem overflow={"auto"}>
                        <Flex
                            mb={{ base: 6, md: 8 }}
                            gap="6"
                            alignItems={{
                                base: 'start', md: "center"
                            }}
                            flexDir={{ base: 'column', md: 'row' }}
                            overflow={"auto"}
                        >
                            <Text fontSize={{ base: 'md', md: 'lg' }} color="white">
                                Topics
                            </Text>
                            <TopicsFilter
                                topics={topics}
                                selected={selectedTopics}
                                onChange={toggleTopic}
                            />
                        </Flex>
                        <HomeGrid posts={filteredPosts.slice(0, 3)} />

                        <Box py={8}>
                            <NewsletterCTA />
                        </Box>

                        <HomeGrid posts={filteredPosts.slice(3)} />
                        {hasMore && selectedTopics.length === 0 && (
                            <Flex justifyContent={"center"}>
                                <Button
                                    variant="primary"
                                    onClick={handleLoadMore}
                                    mt={8}
                                    w={{ base: 'full', md: '155px' }}
                                    loading={loading}
                                    loadingText="Loading..."
                                >
                                    Load More
                                </Button>
                            </Flex>
                        )}
                    </GridItem>
                    <GridItem display={{ base: 'none', lg: 'block' }}>
                        <MostViewed
                            items={mostViewedItems}
                            isLoading={loadingMostViewed}
                            maxItems={4}
                        />
                    </GridItem>

                </Grid>
            </Container>
        </>
    );
}

