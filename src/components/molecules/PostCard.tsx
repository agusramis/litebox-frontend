import Link from 'next/link';
import { Card, Text, Flex, CardRootProps } from '@chakra-ui/react';
import { Heading } from '@/components/atoms/Heading';
import { Image } from '@/components/atoms/Image';
import { truncateText } from '@/lib/utils';
import type { Post } from '@/lib/types';
import { Badge } from '../atoms/Badge';
import { BookIcon } from '@/app/icons/BookIcon';
import { ArrowRightIcon } from '@/app/icons/ArrowRigthIcon';

interface PostCardProps extends CardRootProps {
    post: Post;
}

export const PostCard = ({ post, ...cardProps }: PostCardProps) => {
    const image = post.attributes.coverImg.data
    const { id: imageId, attributes: { name: imageName, url: imageSrc } } = image

    const imageUrl = imageSrc || ""

    return (
        <Card.Root
            overflow="hidden"
            transition="all 0.3s ease"
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'hard',
                borderColor: 'brand.green',
            }}
            _focus={{
                outline: '2px solid',
                outlineColor: 'brand.black',
                outlineOffset: '2px',
            }}
            bg="white"
            role="article"
            aria-label={post.attributes.title}
            h="100%"
            position={"relative"}
            bgSize="cover"
            borderWidth={0}
            borderRadius={0}
            {...cardProps}
        >
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={imageName}
                    key={imageId}
                    fill
                />
            )}
            <Card.Body p={6} position="absolute" justifyContent={"flex-end"} w="100%" h="100%">
                <Flex flexDir={"column"} >
                    <Flex backgroundColor={"white"} padding={"24px 24px 0 24px"} w={"max-content"}>
                        <Badge
                            borderRadius="35px"
                            px={2}
                            py={1}
                            fontSize="xs"

                        >
                            {post.attributes.topic}
                        </Badge>
                    </Flex>
                    <Flex backgroundColor={"white"} padding={"24px"} w={{ base: 'auto' }} flexDir={"column"} >
                        <Heading
                            as="h3"
                            textStyle={{ base: 'bodyBold', md: 'headingBoldXl' }}
                            flexWrap={"wrap"}
                            color="brand.black"
                        >
                            {truncateText(post.attributes.title, 80)}
                        </Heading>

                        <Flex justifyContent={"space-between"} width={"100%"}>
                            <Link href={`/post/${post.id}`}
                            >
                                <Text
                                    textStyle={{ base: 'bodySemiBoldSm', md: 'bodySemiBoldMd' }}
                                    color="brand.black"
                                >
                                    Read
                                    <ArrowRightIcon size={"lg"} color="#9C73F7" ml="2px" /></Text>
                            </Link>
                            <Text
                                textStyle={"bodyRegularBase"}
                                textAlign={"center"}
                                color="brand.gray.light"
                            >
                                <BookIcon size={"sm"} mr="8px" /> {post.attributes.readTime}mins
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card.Body>
        </Card.Root>
    );
};
