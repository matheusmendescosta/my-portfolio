import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { useNewComment } from './use-new-comment';

type CommentFromProps = {
  label: string;
  placeholder: string;
  submit: string;
  postId: string;
  parentCommentId?: string;
  refetch: () => void;
};

const CommentForm = ({ label, placeholder, submit, postId, parentCommentId, refetch }: CommentFromProps) => {
  const [content, setContent] = useState('');
  const { handlerSubmitComment, isSubmitting } = useNewComment({ postId, content, parentCommentId, setContent, refetch });

  return (
    <form className="mx-auto mt-2 w-full" onSubmit={(e) => handlerSubmitComment(e)}>
      <div className="mb-1">
        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="comment">
          {label}
        </label>
        <textarea
          id="comment"
          name="comment"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
          rows={2}
          className={twJoin(
            'focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow dark:bg-slate-900',
            'focus:outline-none dark:text-white'
          )}
          placeholder={placeholder}
        ></textarea>
      </div>
      <div className="flex items-center justify-end">
        <Button variant="secondary">{isSubmitting ? 'Enviando...' : submit}</Button>
      </div>
    </form>
  );
};

export default CommentForm;
