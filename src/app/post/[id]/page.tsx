import { notFound } from 'next/navigation';
import { PostDetailTemplate } from '@/components/templates/PostDetailTemplate';
import { getPostById } from '@/lib/api';
import { ARTICLE_MD } from '@/lib/static-article';
import type { Metadata } from 'next';

interface PostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const data = await getPostById(id);
        const post = data.attributes
        return {
            title: `${post.title} - LiteBox`,
            description: post.body?.slice(0, 160) ?? post.title,
            openGraph: {
                title: post.title,
                description: post.body?.slice(0, 160) ?? post.title,
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.body?.slice(0, 160) ?? post.title,
            },
        };
    } catch {
        return {
            title: 'Post Not Found - LiteBox',
        };
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params;

    try {
        const post = await getPostById(id);

        return <PostDetailTemplate post={post} markdownContent={ARTICLE_MD} />;
    } catch {
        notFound();
    }
}

export const revalidate = 0;

