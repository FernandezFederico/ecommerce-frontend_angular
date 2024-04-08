export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  created_at: Date | string;
  token: string;
}
export interface UserLoginData {
  email: string;
  password: string;
}