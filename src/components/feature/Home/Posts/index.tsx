import DefaultItem from '@/components/common/Item/DefaultItem';
import { getAllPosts } from '@/lib/usePost';

export default function Posts() {
  const allPosts = getAllPosts();
  return (
    <div>
      {allPosts.map((post) => (
        <DefaultItem key={post.slug} {...post} />
      ))}
    </div>
  );
}
