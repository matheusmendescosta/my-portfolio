import { Badge } from '@/components/ui/badge';
import { BookHeart, MessageSquareCode, MoveUpRightIcon } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

type PostsSectionProps = {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updateAt: string;
  likes: number;
  comments: number;
  author: string;
  category: string;
  tags: string[];
};

const PostSection = ({ id, title, slug, content, createdAt, updateAt, likes, comments, author, category, tags }: PostsSectionProps) => {
  const formatter = useFormatter();
  const t = useTranslations('components.pages.brain.posts_section');

  const formattedDateCreateAt = createdAt
    ? formatter.dateTime(new Date(createdAt), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : '';
  const formattedDateUpdateAt = updateAt
    ? formatter.dateTime(new Date(updateAt), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : '';
  return (
    <Link key={id} href={`brain/post/${id}`}>
      <div className="my-2 rounded border-t-2 border-t-black p-4 shadow-sm sm:mx-32 dark:border-t-white">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold hover:underline dark:text-gray-300">{title}</h1>
          <MoveUpRightIcon />
        </div>
        <p className="pb-1 text-sm dark:text-gray-300">{slug}</p>
        <Badge className="border-black dark:border-white" variant="secondary">
          {category}
        </Badge>
        <div className="my-4 line-clamp-3 dark:text-gray-300">
          {content.trim() != '' && <div className="mb-4 rounded-sm dark:border-b-gray-500" dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
        <div className="flex space-x-2">
          {tags.map((tag, index) => (
            <Badge className="border-black dark:border-white" key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="my-2 flex flex-col justify-start py-2">
          <p className="text-sm dark:text-gray-200">
            {t('create_at')} {formattedDateCreateAt}
          </p>
          <p className="text-sm dark:text-gray-200">
            {t('update_at')} {formattedDateUpdateAt}
          </p>
        </div>
        <p className="mb-2 flex justify-start text-sm dark:text-gray-200">
          {t('by')} {author}
        </p>
        <div className="flex justify-start space-x-2 pt-2">
          <div className="flex space-x-2 text-sm dark:text-gray-200">
            <BookHeart /> <span>{likes}</span>
          </div>
          <div className="flex space-x-2 text-sm dark:text-gray-200">
            <MessageSquareCode /> <span>{comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostSection;
