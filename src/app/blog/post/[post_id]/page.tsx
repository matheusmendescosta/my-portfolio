import PostPage from '@/components/pages/blog/posts/PostPage';

const Page = ({ params }: { params: { post_id: string } }) => {
  return <PostPage postId={params.post_id} />;
};

export default Page;
