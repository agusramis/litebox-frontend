'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    Box,
    HStack,
    Skeleton,
    Separator,
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
        <Box as="aside" w="full" aria-label={title}>
            <Heading as="h3" fontSize="18px" mb={4} color={titleColor} fontWeight={600}>
                {title}
            </Heading>

            <Box>
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
                        <Box key={item.id}>
                            <Link href={item.href} style={{ textDecoration: "none" }} >
                                <HStack
                                    justify="space-between"
                                    align="start"
                                    py={3}
                                    gap={4}
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
                                        color={textColor}
                                        fontWeight={600}
                                        fontSize="16px"
                                        lineHeight="1.4"

                                    >
                                        {item.title}
                                    </Text>
                                    <Box
                                        w="56px"
                                        h="56px"
                                        minW="56px"
                                        borderRadius="md"
                                        overflow="hidden"
                                        bg="brand.gray.light"
                                        flexShrink={0}
                                        position="relative"
                                    >
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.imageAlt ?? item.title}
                                            width={56}
                                            height={56}
                                            priority={index < 2}
                                        />
                                    </Box>
                                </HStack>
                            </Link>
                            {index < list.length - 1 && (
                                <Separator color="brand.gray.light" borderWidth={"1px"} />
                            )}
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};
