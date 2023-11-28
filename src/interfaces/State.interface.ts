import { Post } from "@/interfaces/Post.interface";

export interface PostAction {
  description: string;
  postsList: Array<Post>;
}
