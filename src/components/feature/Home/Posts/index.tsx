import PostItem from '@/components/common/Item/PostItem';
import Gap from '@/components/common/layout/Gap';
import { getAllPosts } from '@/lib/post';

export default function Posts() {
  const allPosts = getAllPosts();
  return (
    <>
      {allPosts.map((post) => (
        <>
          <PostItem
            key={post.slug}
            title={post.data.title}
            content={post.content}
            date={post.data.date}
            href={`/posts/${post.slug}`}
          />
          <Gap size={12} />
        </>
      ))}
    </>
  );
}
