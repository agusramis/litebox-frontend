export interface PostData {
    data: Post;
    meta: Meta;
}
export interface PostsData {
    data: Post[];
    meta: Meta;
}
export interface Post {
    id: number;
    attributes: PostAttributes;
}

export interface PostAttributes {
    title: string;
    subtitle: null | string;
    topic: string;
    author: string;
    readTime: number;
    body: string;
    createdAt: Date | null;
    updatedAt: Date;
    publishedAt: Date;
    coverImg: CoverImg;
}

export interface CoverImg {
    data: Image;
}

export interface Image {
    id: number;
    attributes: ImageAttributes;
}

export interface ImageAttributes {
    name: string;
    url: string;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface RelatedPost {
    id: number;
    title: string;
    imageUrl: string | null;
    topic: string;
    author: string;
    readTime: number;
    createdAt: Date;
}

