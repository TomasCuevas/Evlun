export interface IPost {
  _id: string;
  added_by: Addedby;
  answers: string[];
  content: string;
  date: number;
  likes: any[];
  postRef?: string;
  state: boolean;
}

interface Addedby {
  _id: string;
  name: string;
  username: string;
  avatar: string;
}
