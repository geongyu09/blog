import PostItem from '@/components/common/item/PostItem';
import Gap from '@/components/common/layout/Gap';
import { getAllPosts } from '@/lib/post';

export default function Posts() {
  const allPosts = getAllPosts();
  return (
    <>
      {allPosts.map(({ slug, data: { date, description, title } }) => (
        <>
          <PostItem
            key={`${slug}-${title}-${date}-${description}`}
            title={title}
            description={description}
            date={date}
            href={`/posts/${slug}`}
          />
          <Gap size={12} />
        </>
      ))}
    </>
  );
}
