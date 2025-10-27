import { z } from 'zod';

export const PostSchema = z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string(),
    body: z.string().optional(),
    userId: z.union([z.string(), z.number()]).optional(),
});

export const PostsArraySchema = z.array(PostSchema);

export const RelatedPostSchema = z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string(),
    imageUrl: z.string().optional(),
    createdAt: z.string().optional(),
});

export const RelatedPostsArraySchema = z.array(RelatedPostSchema);

export type Post = z.infer<typeof PostSchema>;
export type RelatedPost = z.infer<typeof RelatedPostSchema>;

