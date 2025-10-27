import { PostData, PostsData, Post, RelatedPost } from './types';

export const PUBLIC_API = process.env.NEXT_PUBLIC_API_URL_LITE_BOX ?? 'https://lite-tech-api.litebox.ai';

function mapPostImageUrl(post: Post): Post {
    const imageUrl = post.attributes.coverImg?.data?.attributes?.url;
    console.log('Original URL:', imageUrl);

    const isUrlComplete = imageUrl && (
        imageUrl.trim().startsWith('http://') ||
        imageUrl.trim().startsWith('https://') ||
        imageUrl.includes('lite-tech-api.litebox.ai') ||
        imageUrl.includes('amazonaws.com')
    );

    const completeUrl = imageUrl
        ? (isUrlComplete
            ? imageUrl.trim()
            : `${PUBLIC_API}${imageUrl}`)
        : '';

    console.log('Complete URL:', completeUrl);

    return {
        ...post,
        attributes: {
            ...post.attributes,
            coverImg: {
                ...post.attributes.coverImg,
                data: {
                    ...post.attributes.coverImg.data,
                    attributes: {
                        ...post.attributes.coverImg.data.attributes,
                        url: completeUrl,
                    }
                }
            }
        }
    };
}

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${PUBLIC_API}/api/posts`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) {
            console.error('Failed to fetch posts:', res.status);
            return [];
        }
        const PostData: PostsData = await res.json();

        return PostData.data.map(mapPostImageUrl);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function fetchPosts(
    start: number,
    limit: number,
    signal?: AbortSignal,
    options?: { next?: { revalidate?: number } }
): Promise<PostsData> {
    const url = `${PUBLIC_API}/api/posts` +
        `?pagination[start]=${start}&pagination[limit]=${limit}&populate=*`;

    const fetchOptions: RequestInit = { signal };

    if (options?.next) {
        fetchOptions.next = options.next;
    } else {
        fetchOptions.cache = 'no-store';
    }

    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`);
    }
    const data: PostsData = await res.json();

    return {
        ...data,
        data: data.data.map(mapPostImageUrl),
    };
}

export async function getPostById(id: string): Promise<Post> {
    const res = await fetch(`${PUBLIC_API}/api/posts/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.status}`);
    }
    const PostData: PostData = await res.json();
    return mapPostImageUrl(PostData.data);
}

function mapRelatedPostToPost(relatedPost: RelatedPost): Post {
    const imageName = relatedPost.imageUrl
        ? relatedPost.imageUrl.split('/').pop()?.split('?')[0] || 'related-post.jpg'
        : 'related-post.jpg';

    return {
        id: relatedPost.id,
        attributes: {
            title: relatedPost.title,
            subtitle: null,
            topic: relatedPost.topic,
            author: relatedPost.author,
            readTime: relatedPost.readTime,
            body: '',
            createdAt: relatedPost.createdAt,
            updatedAt: relatedPost.createdAt,
            publishedAt: relatedPost.createdAt,
            coverImg: {
                data: {
                    id: relatedPost.id,
                    attributes: {
                        name: imageName,
                        url: relatedPost.imageUrl || '',
                    }
                }
            }
        }
    };
}

export async function getRelatedPosts(limit = 3): Promise<Post[]> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const url = `${apiUrl}/api/posts/related?limit=${limit}`;

        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            console.error('Failed to fetch related posts:', res.status);
            return [];
        }

        const data: RelatedPost[] = await res.json();
        if (!data || !Array.isArray(data)) return [];

        return data.map(mapRelatedPostToPost);

    } catch (error) {
        console.error('Error fetching related posts:', error);
        return [];
    }
}

export async function createRelatedPost(formPostData: FormData): Promise<RelatedPost> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const url = `${apiUrl}/api/post/related`;

    const res = await fetch(url, {
        method: 'POST',
        body: formPostData,
    });

    if (!res.ok) {
        const error = await res.text().catch(() => 'Failed to create post');
        throw new Error(error);
    }

    const data: RelatedPost = await res.json();
    return data;
}
