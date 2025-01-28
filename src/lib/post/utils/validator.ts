import { Post } from '@/types/post';

// 해당 린트 설정은 추후에 다른 ecport 문이 생길 시 제거
// eslint-disable-next-line import/prefer-default-export
export function checkPostData(post: Post) {
  try {
    if (!post.slug) throw new Error('올바르지 않는 포스트입니다.');
    if (!post.data.date)
      throw new Error(`"${post.slug}" 포스트에 날짜가 없습니다.`);
    if (!post.data.description)
      throw new Error(`"${post.slug}" 포스트에 설명이 없습니다.`);
    if (!post.data.title)
      throw new Error(`"${post.slug}" 포스트에 제목이 없습니다.`);
    if (!post.data.tags)
      throw new Error(`"${post.slug}" 포스트에 태그가 없습니다.`);
  } catch (e: any) {
    throw new Error(`올바르지 않은 포스트입니다. \n - ${e.message}`);
  }
}
