export interface IUserResp {
  _id: string;
  username: string;
  imageUrl: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  email: string;
  mobile: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
