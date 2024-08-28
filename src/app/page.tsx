import Container from '@/components/common/layout/Container';
import Banner from '@/components/feature/Home/HomeBanner';
import MonitoringEmbedSection from '@/components/feature/Home/MonitoringEmbedSection';

export default function Home() {
  return (
    <main>
      <Banner />
      <Container>
        <MonitoringEmbedSection />
      </Container>
    </main>
  );
}
