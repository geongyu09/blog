import DefaultButton from '@/components/common/Button/DefaultButton';
import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import SplitLayout from '@/components/common/layout/SplitLayout';
import SideBarMenu from '@/components/common/SideBarMenu';
import TagsSection from '@/components/common/TagsSection';
import CurrentPostsSection from '@/components/feature/Home/CurrentPostsSection';
import HomeBannerSection from '@/components/feature/Home/HomeBannerSection';
import ROUTE_PATH from '@/constants/path/routePath';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HomeBannerSection />
      <Gap size={12} />
      <Container>
        <Gap size={12} />

        <h2 className="text-2xl font-bold">최근 포스트</h2>
        <Gap size={4} />

        <SplitLayout
          sidebar={
            <SideBarMenu>
              <TagsSection />
            </SideBarMenu>
          }
          gap="xl"
        >
          <>
            <CurrentPostsSection amount={3} />
            <Gap size={8} />
            <Link href={ROUTE_PATH.POSTS({})}>
              <DefaultButton text="전체 포스트 보기" />
            </Link>
          </>
        </SplitLayout>
      </Container>
    </>
  );
}
