export interface IPosts {
  posts: Post[];
}

interface Post {
  _id: string;
  content: string;
  added_by: Addedby;
  state: boolean;
  date: number;
  likes: any[];
  comments: any[];
}

interface Addedby {
  _id: string;
  name: string;
  username: string;
  avatar: string;
}
