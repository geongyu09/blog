import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import SplitLayout from '@/components/common/layout/SplitLayout';
import Tag from '@/components/common/tag';
import AllPostsSection from '@/components/feature/Home/AllPostsSection';
import SideBarMenu from '@/components/feature/Home/SideBarMenu';
import Link from 'next/link';

interface PostPageProps {
  searchParams: { tag?: string };
}

export default function PostPage({ searchParams: { tag } }: PostPageProps) {
  return (
    <Container>
      <h2 className="text-2xl font-bold">전체 포스트</h2>
      <Gap size={4} />

      {tag && (
        <>
          <div className="flex items-center gap-4">
            <Link href="/">x</Link>
            <p className="font-semibold">필터 : </p>
            <Tag tag={tag} />
          </div>
          <Gap size={8} />
        </>
      )}

      <SplitLayout sidebar={<SideBarMenu />} gap="xl">
        <AllPostsSection filteredTag={tag} />
      </SplitLayout>
    </Container>
  );
}
