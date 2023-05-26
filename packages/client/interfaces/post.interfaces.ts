export interface IPost {
  _id: string;
  added_by: AddedBy;
  answers: string[];
  content: string;
  date: number;
  likes: string[];
  postRef?: string;
  state: boolean;
  text: string;
}

export interface AddedBy {
  _id: string;
  avatar: string;
  name: string;
  username: string;
}

export interface ICreatePost {
  text: string;
  content: string;
  postRef?: string;
}
