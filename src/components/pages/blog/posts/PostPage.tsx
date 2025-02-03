'use client';

import { usePost } from './use-post';

type PostPageProps = {
  postId: string;
};

const PostPage = ({ postId }: PostPageProps) => {
  const { post } = usePost({ postId });

  if (!post) {
    return <p>Carregando...</p>;
  }
  console.log('post', post);
  return (
    <div className="mx-auto max-w-3xl rounded p-6 shadow">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <p className="text-gray-500">Slug: {post?.slug}</p>
      <div className="mt-4 text-gray-700">{post?.content}</div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Publicado em {post?.createdAt}</p>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">❤️ {post?._count.likes}</p>
      </div>
      <div className="mt-4">
        {post?.comments.length > 0 ? (
          <ul className="space-y-2">
            {post?.comments.map((comment, index) => (
              <li key={index} className="text-gray-700">
                {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum comentário disponível.</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;
