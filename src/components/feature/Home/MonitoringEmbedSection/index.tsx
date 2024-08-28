import Embed from '@/components/common/Embed';

export default function MonitoringEmbedSection() {
  const title = '안녕하세요! 성장하는 개발자 박건규입니다';
  const description = '안녕하세요! 성장하는 개발자 박건규입니다';
  const image = 'https://images.unsplash.com/photo-1631351445793-3f3b9c7c6b2a';

  return <Embed title={title} description={description} image={image} />;
}
