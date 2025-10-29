import { Flex, Link } from '@chakra-ui/react';

import type { Post } from '@/lib/types';
import { truncateText } from '@/lib/utils';
import { ArrowRightIcon } from '@/app/icons/ArrowRigthIcon';

import { Image } from '../atoms/Image';
import { Heading } from '../atoms/Heading';
import { Text } from '../atoms/Text';
import { Badge } from '../atoms/Badge';
import { BookIcon } from '@/app/icons/BookIcon';

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
                    >
                        {post.attributes.topic}
                    </Badge>
                </Flex>
                <Flex backgroundColor={"brand.black"} flexDir={"column"} w={{ base: "auto", lg: '100%' }}
                    maxWidth={"557px"}
                    padding={"24px"}
                    gap={"10px"}
                >
                    <Heading
                        as="h3"
                        textStyle={{ base: 'bodyBold', md: 'headingBoldXl' }}>
                        {truncateText(post.attributes.title, 80)}
                    </Heading>
                    <Flex justifyContent={"space-between"} width={"100%"}>
                        <Link href={`/post/${post.id}`} >
                            <Text
                                color="brand.white"
                                textStyle={{ base: 'bodySemiBoldSm', md: 'bodySemiBoldMd' }}>
                                Read
                                <ArrowRightIcon size={"lg"} color="#9C73F7" ml="2px" /></Text>
                        </Link>
                        <Text
                            color="brand.gray.light"
                            textStyle={"bodyRegularBase"}
                            textAlign={"center"}
                        >
                            <BookIcon size={"sm"} mr="8px" /> {post.attributes.readTime}mins
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
