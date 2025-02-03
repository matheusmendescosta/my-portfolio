export type postsDto = {
  hasMore: boolean;
  limit: number;
  offset: number;
  totalCount: number;
  posts: {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: 'DRAFT' | 'PUBLISHED';
    createdAt: string;
    updatedAt: string;
    authorId: string;
    categoryId: string;
    _count: {
      likes: number;
    };
    comments: [];
    author: {
      name: string;
    };
    category: {
      name: string;
    };
    tags: {
      name: string;
      slug: string;
    }[];
  }[];
};

export type PostDTO = {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  authorId: string;
  categoryId: string;
  _count: {
    likes: number;
  };
  comments: commentDTO;
  category: categoryDto;
  tags: tagsDto;
};

export type commentDTO = {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  userId: string;
  parentCommentId: string | null;
}[];

export type categoryDto = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export type tagsDto = {
  name: string;
  slug: string;
}[];

export type authorDto = {}