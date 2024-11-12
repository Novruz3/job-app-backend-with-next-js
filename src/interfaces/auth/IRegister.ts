export interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  userType: "employee" | "employer";
}