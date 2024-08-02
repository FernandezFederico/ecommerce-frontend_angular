export interface User {
  _id: string;
  userImage?: string;
  userName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
}

export interface userRole {
  _id: string;
  roleName: string;
}
