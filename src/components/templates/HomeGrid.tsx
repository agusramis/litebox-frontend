import { Grid, GridItem, type GridItemProps } from '@chakra-ui/react';
import { PostCard } from '@/components/molecules/PostCard';
import type { Post } from '@/lib/types';

interface HomeGridProps {
    posts: Post[];
}
function isTall(index: number) {
    const m = index % 6;
    return m === 0 || m === 4;
}

export const HomeGrid = ({ posts }: HomeGridProps) => {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            w="full"
            gap={8}
            gridAutoRows={{ base: "378px", md: "189px" }}
        >
            {posts.map((post, index) => {
                const tall = isTall(index);

                const gridProps: GridItemProps = {
                    colSpan: { base: 1, md: 1 },
                    rowSpan: { base: 1, md: tall ? 4 : 2 },
                };

                return (
                    <GridItem key={post.id} {...gridProps}>
                        <PostCard post={post} />
                    </GridItem>
                );
            })}
        </Grid >
    );
};

