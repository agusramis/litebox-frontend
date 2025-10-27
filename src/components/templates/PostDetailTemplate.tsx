import {
    Box,
    Container,
    Grid,
    GridItem,
    Text,
    Flex,
    Link,
    Avatar,
} from '@chakra-ui/react';
import { Heading } from '@/components/atoms/Heading';
import { Image } from '@/components/atoms/Image';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { SocialShare } from '@/components/molecules/SocialShare';
import { MostViewed } from '@/components/organisms/MostViewedItem';
import type { Post } from '@/lib/types';

import { RelatedPostsTemplate } from './RelatedPostsTemplate';
import { truncateText } from '@/lib/utils';
import { BookIcon } from '@/app/icons/BookIcon';
import { LeftArrowIcon } from '@/app/icons/LeftArrowIcon';
import { fetchPosts } from '@/lib/api';

interface PostDetailTemplateProps {
    post: Post;
    markdownContent: string;
}


export const PostDetailTemplate = async ({ post, markdownContent }: PostDetailTemplateProps) => {
    const imageUrl = post.attributes.coverImg.data.attributes.url || '';
    const data = await fetchPosts(0, 4);
    const mostViewedPosts = data.data;

    const mostViewedItems = mostViewedPosts.map((p) => ({
        id: p.id,
        title: p.attributes.title,
        href: `/post/${p.id}`,
        imageUrl: p.attributes.coverImg.data.attributes.url || '',
        imageAlt: p.attributes.coverImg.data.attributes.name || p.attributes.title,
    }));

    return (
        <Box backgroundColor="brand.white">
            <Flex
                overflow="hidden"
                transition="all 0.3s ease"
                role="article"
                aria-label={post.attributes.title}
                bgSize="cover"
                bgRepeat="no-repeat"
                backgroundColor={"brand.white"}
                flexDir={"column"}
                height={{ base: "448px", md: "677px" }}
                justifyContent={"flex-end"}
                position={"relative"}
            >
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={post.attributes.title}
                        fill
                        priority
                    />
                )}
                <Flex p={{ sm: 6, md: 16 }} flexDir="column" position="absolute" justifyContent={"center"} h="100%" >
                    <Link href='/'>
                        <Flex gap="8px" mb="10px">
                            <LeftArrowIcon size="lg" />
                            <Text>Blog</Text>
                        </Flex>
                    </Link>
                    <Flex padding={{ base: '16px 16px 0', md: '24px 24px 0' }}
                        alignItems="center"
                        gap="8px" w={"max-content"} backgroundColor={"brand.white"}>
                        <Avatar.Root shape="full" size="lg">
                            <Avatar.Fallback name="Random User" />
                            <Avatar.Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
                        </Avatar.Root>
                        <Text color="brand.gray.dark">{post.attributes.author}</Text>
                    </Flex>
                    <Flex backgroundColor={"brand.white"} flexDir={"column"} w={"auto"}
                        padding={"24px"}
                    >
                        <Heading
                            as="h3"
                            size={'md'}
                            mb={3}
                        >
                            {truncateText(post.attributes.title, 80)}
                        </Heading>
                        <Flex width={"100%"} gap={"10px"} alignItems="center">
                            <BookIcon size="sm" color="brand.gray.light" />
                            <Text
                                fontSize={"sm"}
                                color="brand.gray.dark"
                                fontWeight={400}
                            >
                                {post.attributes.readTime} min read
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex>

            </Flex>
            <Container maxW={{ base: '100%' }} px={{ base: 4, md: 6 }} bg="brand.white">

                <Box as="article" >
                    <Grid
                        templateColumns={{ base: '1fr', lg: 'repeat(3,1fr)' }}
                        columnGap={{ base: 0, lg: 8 }}
                    >
                        <GridItem as="aside" display={{ base: 'none', lg: 'block' }}>
                            <Heading as="h3" size="md" mb={3}>
                                Share On
                            </Heading>
                            <SocialShare
                                title={post.attributes.title}
                                path={`/post/${post.id}`}
                            />
                        </GridItem>
                        <GridItem>
                            <Box mb={{ base: 10, md: 12 }}>
                                <MarkdownRenderer content={markdownContent} />
                            </Box>
                        </GridItem>
                        <GridItem display={{ base: 'none', lg: 'block' }}>
                            <Flex flexDir="column" gap={6}>
                                <MostViewed
                                    items={mostViewedItems}
                                    maxItems={4}
                                    titleColor="brand.black"
                                    textColor="brand.black"
                                />
                            </Flex>
                        </GridItem>
                        <GridItem display={{ base: 'block', lg: 'none' }}>
                            <Flex gap={6} flexDir={"column"}>
                                <Heading as="h3" size="md" >
                                    Share On
                                </Heading>
                                <SocialShare
                                    title={post.attributes.title}
                                    path={`/post/${post.id}`}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>


                </Box>
            </Container>
            <RelatedPostsTemplate />

            <Flex></Flex>
        </Box >
    );
};
