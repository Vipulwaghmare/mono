import { TUser } from "@/types/user";
import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<TUser | null>({
    name: "Vipul Waghmare",
    email: "vipulwaghmare@google.com",
  }); // TODO: Change back to null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useGetUser = (): TUser => {
  const userContext = useUser();
  if (!userContext.user) {
    // TODO: Navigate to login
    throw new Error("user not found");
  }
  return userContext.user;
};
