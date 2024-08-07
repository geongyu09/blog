export interface Post {
  content: string;
  slug: string;
  data: PostData;
}

export interface PostData {
  title: string;
  date: string;
  thumbnail: string;
}
