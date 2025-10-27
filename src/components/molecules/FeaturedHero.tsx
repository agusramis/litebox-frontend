import { Heading, Text, Flex, Link } from '@chakra-ui/react';
import { Image } from '@/components/atoms/Image';
import type { Post } from '@/lib/types';
import { Badge } from '../atoms/Badge';
import { truncateText } from '@/lib/utils';
import { ArrowRightIcon } from '@/app/icons/ArrowRigthIcon';

interface FeaturedHeroProps {
    post: Post;
}

export const FeaturedHero = ({ post }: FeaturedHeroProps) => {
    const image = post.attributes.coverImg.data;
    const { attributes: { name: imageName, url: imageSrc } } = image;
    const imageUrl = imageSrc || '';



    return (
        <Flex
            overflow="hidden"
            transition="all 0.3s ease"
            role="article"
            aria-label={post.attributes.title}
            bgSize="cover"
            bgRepeat="no-repeat"
            backgroundColor={"brand.black"}
            flexDir={"column"}
            height={"348px"}
            justifyContent={"flex-end"}
            position={"relative"}
        >
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={imageName || post.attributes.title}
                    fill
                />
            )}
            <Flex p={6} flexDir="column" position="absolute" justifyContent={"flex-end"} w="100%" h="100%">
                <Flex padding={"24px 24px 0 24px"} w={"max-content"} backgroundColor={"brand.black"}>
                    <Badge
                        px={2}
                        py={1}
                        fontSize="xs"

                    >
                        {post.attributes.topic}
                    </Badge>
                </Flex>
                <Flex backgroundColor={"brand.black"} flexDir={"column"} w={{ base: "auto", lg: 'max-content' }}
                    padding={"24px"}
                >
                    <Heading
                        as="h3"
                        size={'md'}
                        mb={3}
                    >
                        {truncateText(post.attributes.title, 80)}
                    </Heading>
                    <Flex justifyContent={"space-between"} width={"100%"}>
                        <Link href={`/post/${post.id}`} >
                            <Text
                                fontSize={"md"}
                                color="brand.white"
                                fontWeight={600}
                            >
                                Read
                                <ArrowRightIcon size={"lg"} color="#9C73F7" ml="2px" /></Text>
                        </Link>
                        <Text
                            fontSize={"sm"}
                            color="brand.gray.light"
                            fontWeight={400}
                        >
                            {post.attributes.readTime} min read
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
