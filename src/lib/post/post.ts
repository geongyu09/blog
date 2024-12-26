import { Post } from '@/types/post';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { checkPostData } from './utils/validator';

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

export function getAllTags() {
  const allPosts = getAllPosts();

  const tags = new Set<string>();

  allPosts
    .map((post) => post.data.tags)
    .forEach((tag) => tag.split(' ').forEach((t) => tags.add(t)));

  return Array.from(tags);
}

/**
 * @description 인자로 주어진 수만큼 최근 포스트를 반환합니다
 * @param amount 보여줄 포스트의 수
 * @returns Post[]
 */
export function getCurrentPosts(amount: number): Post[] {
  const allPosts = getAllPosts();

  return allPosts.slice(0, amount);
}
