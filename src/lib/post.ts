import { Post } from '@/types/post';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

function checkPostData(post: Post) {
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

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  checkPostData({ data, slug: realSlug, content } as Post);

  return { data, slug: realSlug, content } as Post;
}

/**
 * @description 모든 포스트를 반환합니다.
 * @returns Post[]
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  if (posts.length === 0) {
    throw new Error('No posts found');
  }

  posts.forEach((post) => checkPostData(post));

  return posts;
}
