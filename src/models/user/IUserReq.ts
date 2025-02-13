export interface IUserReq extends Document {
  username?: string;
  email: string;
  mobile?: string;
  imageUrl?: string;
  password: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}
