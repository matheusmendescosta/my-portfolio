'use client';

import { ThemeContext } from '@/contexts/ThemeProvider';
import { CircleMinus, Ellipsis, Ghost, ThumbsUp } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useContext, useEffect, useRef, useState } from 'react';
import CommentForm from './CommentForm';
import SavePostForm from './SavePostForm';
import { useNewLike } from './use-new-like';
import { usePost } from './use-post';

type PostPageProps = { postId: string };

const PostPage = ({ postId }: PostPageProps) => {
  const t = useTranslations('components.pages.brain.post.post_page');
  const formatter = useFormatter();
  const { post, loadPost } = usePost({ postId });
  const { handlerSubmitLike } = useNewLike({ postId });
  const theme = useContext(ThemeContext);
  const [showAllReplies, setShowAllReplies] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (post?.content && iframeRef.current) {
      const document = iframeRef.current.contentDocument;
      if (document) {
        const isDark = theme.mode === 'dark';

        const bgColor = isDark ? '#030712' : '#ffffff';
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
          if (iframeRef.current?.contentWindow) {
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
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="rounded p-6 shadow sm:w-9/12">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-500">
          {t('slug')}: {post.slug}
        </p>
        <div className="my-2 rounded-lg p-2">
          <iframe ref={iframeRef} className="w-full" sandbox="allow-scripts allow-same-origin" />
        </div>
        <p className="text-sm text-gray-500">
          {t('create_at')} {formattedDateCreateAt}
        </p>
        <p className="text-sm text-gray-500">
          {t('update_at')} {formattedDateUpdatedAt}
        </p>
        <div className="mt-4 flex justify-start space-x-2">
          <div className="flex">
            <button className="transform transition-transform duration-300 ease-in-out hover:scale-110" onClick={handlerSubmitLike}>
              <ThumbsUp />
            </button>
            <p className="ml-2">{post._count.likes}</p>
          </div>
          <SavePostForm postId={post.id} />
        </div>
        <div className="mt-4 rounded-md p-2">
          {post.comments.length > 0 ? (
            <ul className="space-y-2">
              {post.comments.map((comment) => (
                <li key={comment.id} className="relative">
                  <span className="flex">
                    <Ghost /> <p className="pl-1">{t('label_commentary')} ...</p>
                  </span>
                  <div className="rounded-lg border p-4 shadow-md">{comment.content}</div>
                  <ul className="ml-4 mt-1 space-y-2 border-l-2 pl-4">
                    {comment.replies.length > 0 && (
                      <>
                        {comment.replies
                          .filter((_, index, array) => (showAllReplies === comment.id ? true : index === 0 || index === array.length - 1))
                          .map((reply, index, _) => (
                            <li key={reply.id} className="relative">
                              <span className="flex">
                                <Ghost /> <p className="pl-1">{t('label_replies')} ...</p>
                              </span>
                              <div className="rounded-lg border p-4 shadow-md">{reply.content}</div>

                              {index === 0 && comment.replies.length > 2 && showAllReplies !== comment.id && (
                                <div
                                  className="my-2 flex cursor-pointer justify-center text-center text-gray-500"
                                  onClick={() => setShowAllReplies(comment.id)}
                                >
                                  <Ellipsis />
                                </div>
                              )}
                            </li>
                          ))}
                        {showAllReplies === comment.id && (
                          <div
                            className="flex cursor-pointer justify-center text-center text-gray-500"
                            onClick={() => setShowAllReplies(null)}
                          >
                            <CircleMinus />
                          </div>
                        )}
                      </>
                    )}
                  </ul>
                  <div className="ml-4 mt-1 space-y-2 pl-4">
                    <CommentForm
                      label={t('label_title_answer')}
                      placeholder={t('label_placeholder_answer')}
                      submit={t('submit_answer')}
                      postId={postId}
                      parentCommentId={comment.id}
                      refetch={() => {
                        loadPost();
                        setShowAllReplies(comment.id);
                      }}
                    />
                  </div>
                </li>
              ))}
              <CommentForm
                label={t('label_title_commentary')}
                placeholder={t('label_placeholder_commentary')}
                submit={t('submit_commentary')}
                postId={postId}
                refetch={loadPost}
              />
            </ul>
          ) : (
            <>
              <p className="text-gray-500">{t('not_comments')}</p>
              <CommentForm
                label={t('label_title_commentary')}
                placeholder={t('label_placeholder_commentary')}
                submit={t('submit_commentary')}
                postId={postId}
                refetch={loadPost}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
