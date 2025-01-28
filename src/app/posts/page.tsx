import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import SplitLayout from '@/components/common/layout/SplitLayout';
import Tag from '@/components/common/tag';
import AllPostsSection from '@/components/feature/Post/AllPostsSection';
import Link from 'next/link';
import SideBarMenu from '@/components/common/SideBarMenu';
import TagsSection from '@/components/common/TagsSection';
import ROUTE_PATH from '@/constants/path/routePath';

interface PostPageProps {
  searchParams: { tag?: string };
}

export default function PostPage({ searchParams: { tag } }: PostPageProps) {
  return (
    <Container>
      <Gap size={14} />
      <h2 className="text-4xl font-bold text-center">전체 포스트들</h2>
      <Gap size={24} />

      {tag && (
        <>
          <div className="flex items-center gap-4">
            <Link href={ROUTE_PATH.POSTS({})}>x</Link>
            <p className="font-semibold">필터 : </p>
            <Tag tag={tag} />
          </div>
          <Gap size={8} />
        </>
      )}

      <SplitLayout
        sidebar={
          <SideBarMenu>
            <TagsSection />
          </SideBarMenu>
        }
        gap="xl"
      >
        <AllPostsSection filteredTag={tag} />
      </SplitLayout>
    </Container>
  );
}
