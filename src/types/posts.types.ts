export interface IPost {
  id: number;
  title: string;
  body: string;
  author: IAuthor;
  image?: string;
  tags: { arabic_name: string; name?: string; description?: string }[],
  created_at: string;
  comments_count: number;
  comments?: IComment[]
}
export interface IAuthor {
  id?: number;
  profile_image: string;
  username?: string;
  name: string;
  email?: string
}
export interface IComment {
  id: number
  body: string
  author: IAuthor
}