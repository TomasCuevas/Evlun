export interface IComment {
  _id: string;
  content: string;
  added_by: Addedby;
  postRef: string;
  state: boolean;
  date: number;
  likes: any[];
}

interface Addedby {
  _id: string;
  name: string;
  username: string;
  avatar: string;
}
