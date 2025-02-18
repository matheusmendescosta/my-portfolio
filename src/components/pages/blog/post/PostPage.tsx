'use client';

import { useContext, useEffect, useRef } from 'react';
import { usePost } from './use-post';
import { ThemeContext } from '@/contexts/ThemeProvider';
import { useFormatter } from 'next-intl';

type PostPageProps = {
  postId: string;
};

const PostPage = ({ postId }: PostPageProps) => {
  const formatter = useFormatter();
  const { post } = usePost({ postId });
  const theme = useContext(ThemeContext);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (post?.content && iframeRef.current) {
      const document = iframeRef.current.contentDocument;
      if (document) {
        const isDark = theme.mode === 'dark';

        const bgColor = isDark ? '#000000' : '#ffffff';
        const textColor = isDark ? '#ffffff' : '#000000';
        const linkColor = isDark ? '#90cdf4' : '#1a73e8';
        document.open();
        document.write(`
            <html>
              <head>
                <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 10px;
                  background: ${bgColor};
                  color: ${textColor};
                  height: auto;
                }
                pre {
                  background: ${isDark ? '#2d3748' : '#f3f4f6'};
                  color: ${isDark ? '#e2e8f0' : '#1f2937'};
                  padding: 10px;
                  border-radius: 5px;
                  overflow-x: auto;
                }
                a {
                  color: ${linkColor};
                  text-decoration: underline;
                }
              </style>
              </head>
              <body>
                ${post.content}
              </body>
            </html>
          `);
        document.close();

        const adjustIframeHeight = () => {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            const body = iframeRef.current.contentDocument?.body;
            const height = body ? body.scrollHeight : 0;
            iframeRef.current.style.height = `${height}px`;
          }
        };

        iframeRef.current.onload = adjustIframeHeight;
        adjustIframeHeight();
      }
    }
  }, [post?.content, theme]);

  const formattedDateCreateAt = post?.createdAt
    ? formatter.dateTime(new Date(post.createdAt), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '';

  const formattedDateUpdatedAt = post?.updatedAt
    ? formatter.dateTime(new Date(post.updatedAt), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '';

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-w-full rounded p-6 shadow">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <p className="text-gray-500">Slug: {post?.slug}</p>
      <div className="my-2 rounded-lg p-2">
        <iframe ref={iframeRef} className="w-full" sandbox="allow-scripts allow-same-origin" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="text-sm text-gray-500">publish in {formattedDateCreateAt}</p>
        <p className="text-sm text-gray-500">actualized in {formattedDateUpdatedAt}</p>
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
          <p className="text-gray-500">No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;
