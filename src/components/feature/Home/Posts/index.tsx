import DefaultItem from '@/components/common/Item/DefaultItem';
import { getAllPosts } from '@/lib/post';

export default function Posts() {
  const allPosts = getAllPosts();
  return (
    <>
      {allPosts.map((post) => (
        <DefaultItem key={post.slug} {...post} />
      ))}
    </>
  );
}
