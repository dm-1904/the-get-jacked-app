import { createContext, useCallback } from "react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { createUser, UserRow } from "../api";

export type TUserContext = {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  postUser: (user: string, password: string) => Promise<void>;
  userID: string;
  setUserID: (userID: string) => void;
};

const CreateUser = createContext<TUserContext | undefined>(undefined);

const CreateUserPro = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");

  const postUser = useCallback(async (username: string, password: string) => {
    try {
      const newUser: UserRow = await createUser(username, password);
      setUserID(newUser.id);
      setUsername(username);
      setPassword(password);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: newUser.id,
          username: username,
          // password: password,
        })
      );

      toast.success("Account created 🎉");
    } catch (err: unknown) {
      const msg =
        err instanceof Error &&
        (err.message?.includes("Username") || err.message?.includes("unique"))
          ? "Username already exists"
          : err instanceof Error
          ? err.message
          : "Unknown error";
      toast.error(msg);
      throw err;
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { username, password, id } = JSON.parse(storedUser);
      setUsername(username);
      setPassword(password);
      setUserID(id);
    }
  }, []);

  useEffect(() => {
    console.log("Updated userID:", userID);
  }, [userID]);

  return (
    <CreateUser.Provider
      value={{
        username,
        password,
        setUsername,
        setPassword,
        postUser,
        userID,
        setUserID,
      }}
    >
      {children}
    </CreateUser.Provider>
  );
};

export { CreateUser, CreateUserPro };
