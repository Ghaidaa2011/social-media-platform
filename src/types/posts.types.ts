export interface IPost {
  id: number;
  title: string;
  body: string;
  author: IAuthor;
  image?: string;
  tags: [],
  created_at: string;
  comments_count: number
}
interface IAuthor {
  id: number;
  profile_image: string;
  username: string;
  name: string;
  email: string
}