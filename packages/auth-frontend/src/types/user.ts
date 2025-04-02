export type TUser = {
  userId: string;
  name: string;
  email: string;
}

export type UserContextType = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};