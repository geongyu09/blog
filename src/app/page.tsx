import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import SplitLayout from '@/components/common/layout/SplitLayout';
import Tag from '@/components/common/tag';
import HomeBannerSection from '@/components/feature/Home/HomeBannerSection';
import SideBarMenu from '@/components/feature/Home/SideBarMenu';
import Link from 'next/link';
import CurrentPostsSection from '@/components/feature/Home/CurrentPostsSection';

interface HomeProps {
  searchParams: { tag?: string };
}
export default function Home({ searchParams: { tag } }: HomeProps) {
  return (
    <>
      <HomeBannerSection />
      <Gap size={12} />
      <Container>
        <Gap size={12} />

        <h2 className="text-2xl font-bold">최근 포스트</h2>
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
          <>
            <CurrentPostsSection amount={2} />
            <Gap size={8} />
            <Link
              href="/posts"
              className="py-4 text-center block bg-slate-100 rounded-md text-slate-900 font-semibold"
            >
              전체 포스트 보기
            </Link>
          </>
        </SplitLayout>
      </Container>
    </>
  );
}
