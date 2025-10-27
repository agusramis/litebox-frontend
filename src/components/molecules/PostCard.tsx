import Link from 'next/link';
import { Card, Text, Flex, CardRootProps } from '@chakra-ui/react';
import { Heading } from '@/components/atoms/Heading';
import { Image } from '@/components/atoms/Image';
import { truncateText } from '@/lib/utils';
import type { Post } from '@/lib/types';
import { Badge } from '../atoms/Badge';
import { BookIcon } from '@/app/icons/BookIcon';
import { ArrowRightIcon } from '@/app/icons/ArrowRigthIcon';

interface PostCardProps extends Omit<CardRootProps, 'variant'> {
    post: Post;
    variant?: 'default' | 'compact';
}

export const PostCard = ({ post, variant = 'default', ...cardProps }: PostCardProps) => {
    const isCompact = variant === 'compact';
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
            <Card.Body p={isCompact ? 4 : 6} position="absolute" justifyContent={"flex-end"} w="100%" h="100%">
                <Flex flexDir={"column"} >
                    <Flex backgroundColor={"white"} padding={"24px 24px 0 24px"} w={"max-content"}>
                        <Badge
                            borderRadius="full"
                            px={2}
                            py={1}
                            fontSize="xs"

                        >
                            {post.attributes.topic}
                        </Badge>
                    </Flex>
                    <Flex backgroundColor={"white"} padding={"24px"} w={{ base: 'auto', md: 'max-content' }} flexDir={"column"} >
                        <Heading
                            as="h3"
                            size={isCompact ? 'sm' : 'md'}
                            mb={isCompact ? 2 : 3}
                            flexWrap={"wrap"}
                        >
                            {truncateText(post.attributes.title, isCompact ? 60 : 80)}
                        </Heading>

                        <Flex justifyContent={"space-between"} width={"100%"}>
                            <Link href={`/post/${post.id}`}
                            >
                                <Text
                                    fontSize={"md"}
                                    color="brand.black"
                                    fontWeight={600}
                                >
                                    Read
                                    <ArrowRightIcon size={"lg"} color="#9C73F7" ml="2px" /></Text>
                            </Link>
                            <Text
                                fontSize={"sm"}
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
