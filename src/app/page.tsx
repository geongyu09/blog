import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import SplitLayout from '@/components/common/layout/SplitLayout';

import Banner from '@/components/feature/Home/HomeBanner';
import MonitoringEmbedSection from '@/components/feature/Home/MonitoringEmbedSection';
import Posts from '@/components/feature/Home/Posts';

export default function Home() {
  return (
    <>
      <Banner />
      <Gap size={12} />
      <Container>
        <MonitoringEmbedSection />
        <Gap size={12} />
        <SplitLayout sidebar={<div>hihihihihihihihihihihihihihihihi</div>}>
          <Posts />
        </SplitLayout>
      </Container>
    </>
  );
}
