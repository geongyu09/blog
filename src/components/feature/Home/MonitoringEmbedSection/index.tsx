import Embed from '@/components/common/Embed';

export default function MonitoringEmbedSection() {
  // TODO: 데이터 따로 빼기
  const title = '안녕하세요! 성장하는 개발자 박건규입니다';
  const description = '안녕하세요! 성장하는 개발자 박건규입니다';
  const image = 'https://images.unsplash.com/photo-1631351445793-3f3b9c7c6b2a';

  return (
    <section className="shadow-md">
      <Embed
        title={title}
        description={description}
        image={image}
        date={new Date().toISOString().split('T')[0]}
      />
    </section>
  );
}
