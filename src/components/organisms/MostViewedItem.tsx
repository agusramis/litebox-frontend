'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    Box,
    HStack,
    Skeleton,
    Separator,
    Flex
} from '@chakra-ui/react';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Image } from '@/components/atoms/Image';

export type MostViewedItem = {
    id: string | number;
    title: string;
    href: string;
    imageUrl: string;
    imageAlt?: string;
};

export interface MostViewedProps {
    title?: string;
    items?: MostViewedItem[];
    isLoading?: boolean;
    maxItems?: number;
    titleColor?: 'brand.white' | 'brand.black';
    textColor?: 'brand.gray.light' | 'brand.black';
}

export const MostViewed = ({
    title = 'Most viewed',
    items = [],
    isLoading = false,
    maxItems,
    titleColor = 'brand.white',
    textColor = 'brand.gray.light',
}: MostViewedProps) => {
    const list = React.useMemo(
        () => (maxItems ? items.slice(0, maxItems) : items),
        [items, maxItems]
    );

    const showSkeletons = isLoading || list.length === 0;

    return (
        <Flex as="aside" w="304px" aria-label={title} flexDir={" column"} gap="6">
            < Heading as="h3" textStyle={"bodySemiBold"} color={titleColor} >
                {title}
            </Heading >

            <Flex flexDir={"column"} gap="3">
                {showSkeletons
                    ? Array.from({ length: maxItems || 4 }).map((_, i) => (
                        <Box key={i}>
                            <HStack justify="space-between" py={3} gap={4}>
                                <Skeleton height="5" flex="1" />
                                <Skeleton boxSize="56px" borderRadius="md" />
                            </HStack>
                            {i < (maxItems || 4) - 1 && <Separator color="brand.gray.light" />}
                        </Box>
                    ))
                    : list.map((item, index) => (
                        <Flex key={item.id} flexDir={"column"}>
                            <Link href={item.href} style={{ textDecoration: "none" }} >
                                <HStack
                                    justify="space-between"
                                    align="start"
                                    _hover={{
                                        opacity: 0.8,
                                        transition: 'opacity 0.2s ease',
                                    }}
                                    transition="opacity 0.2s ease"
                                    role="article"
                                    aria-label={item.title}
                                >
                                    <Text
                                        flex="1"
                                        color={"brand.gray.light"}
                                        textStyle={"bodySemiBoldSm"}

                                    >
                                        {item.title}
                                    </Text>
                                    <Box
                                        w="80px"
                                        h="80px"
                                        minW="80px"
                                        borderRadius="md"
                                        overflow="hidden"
                                        bg="brand.gray.light"
                                        flexShrink={0}
                                        position="relative"
                                    >
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.imageAlt ?? item.title}
                                            width={80}
                                            height={80}
                                            priority={index < 2}
                                        />
                                    </Box>
                                </HStack>
                            </Link>
                            {index < list.length - 1 && (
                                <Separator color="brand.gray.light" borderWidth={"1px"} mt="3" />
                            )}
                        </Flex>
                    ))}
            </Flex>
        </Flex >
    );
};
