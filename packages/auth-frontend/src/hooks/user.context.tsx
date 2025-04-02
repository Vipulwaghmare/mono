import { TUser } from "../types/user";
import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<TUser | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  );

  const onSet = (user: TUser | null) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  return (
    <UserContext.Provider value={{ user, setUser: onSet }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGetUser = (): TUser => {
  const userContext = useUser();
  if (!userContext.user) {
    // TODO: Navigate to login
    window.location.href = "/login";
    throw new Error("user not found");
  }
  return userContext.user;
};
