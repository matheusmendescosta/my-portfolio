import PostPage from '@/components/pages/blog/post/PostPage';

const Page = async ({ params }: { params: Promise<{ post_id: string }> }) => {
  return <PostPage postId={(await params).post_id} />;
};

export default Page;
