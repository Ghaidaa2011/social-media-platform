export interface IUser {
  username: string;
  name: string;
  email: string;
  id: number;
  profile_image: string | null;
  comments_count: number;
  posts_count: number;
}
