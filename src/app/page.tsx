import Container from '@/components/common/layout/Container';
import MonitoringSection from '@/components/feature/Home/MonitoringSection';
import Posts from '@/components/feature/Home/Posts';

export default function Home() {
  return (
    <main>
      <Container>
        <MonitoringSection />
        <Posts />
      </Container>
    </main>
  );
}
