import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';

import Banner from '@/components/feature/Home/HomeBanner';
import MonitoringEmbedSection from '@/components/feature/Home/MonitoringEmbedSection';
import Posts from '@/components/feature/Home/Posts';

export default function Home() {
  return (
    <main className="">
      <Banner />
      <Gap size={12} />
      <Container>
        <MonitoringEmbedSection />
        <Gap size={12} />
        <Posts />
      </Container>
    </main>
  );
}
