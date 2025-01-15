export type CommentDTO = {
    id: string;
    content: string;
    createdAt: string;
    postId: string;
    userId: string;
    parentCommentId: string | null;
};

export type BlogDTO = {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    categoryId: string;
    _count: {
        likes: number;
    };
    comments: CommentDTO[];
};
