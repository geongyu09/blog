export interface Post {
  content: string;
  slug: string; // 파일명. 이는 URL로 사용
  data: RawPostData;
}

export interface RawPostData {
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  tags: string; // 띄어쓰기로 구분되어진 하나의 문자열
}

export interface PostData extends Omit<Post, 'tags'> {
  tags: string[];
}
