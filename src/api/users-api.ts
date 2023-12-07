import axios from "axios";

export type UserType = {
  followed: boolean;
  id: number;
  name: string;
  photos: { small: string | null; large: string | null };
  status: string | null;
  uniqueUrlName: string | null;
};
type ResponseType = {
  error: string | null;
  items: UserType[];
  totalCount: number;
};

export const usersAPI = {
  getUsers(page: number) {
    return axios.get<ResponseType>(
      `https://social-network.samuraijs.com/api/1.0/users?count=20&page=${page}`
    );
  },
};
