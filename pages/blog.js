import { BlogLayout } from '@/components/Blog';
import { getHomePosts } from '@/lib/notion/notion';

const Blog = async ({ posts, initialDisplayPosts, pagination, featured }) => {
  return (
    <>
      <BlogLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        featured={featured}
        title="All Posts"
      />
    </>
  );
}

export const getStaticProps = async () => {
 return await getHomePosts();
}

export default Blog;
