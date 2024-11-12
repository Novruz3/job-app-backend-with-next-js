export interface IUser {
  created_at: string;
  email: string;
  id: number;
  phone: string;
  name: string;
  password : string;
  isAdmin : boolean;
  userType : string
}