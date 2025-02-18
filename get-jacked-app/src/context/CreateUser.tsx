import { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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

  const postUser = async (username: string, password: string) => {
    const response = await fetch("http://localhost:3000/app-users");
    const users = await response.json();
    const existingUser = users.find(
      (user: { username: string }) => user.username === username
    );

    if (existingUser) {
      toast.error("Username already exists");
      throw new Error("Username already exists");
    }

    const user = { username, password };
    return fetch("http://localhost:3000/app-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP POST failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserID(data.id);
        localStorage.setItem("user", JSON.stringify({ ...user, id: data.id }));
        return data;
      })
      .catch((error: Error) => {
        throw new Error(`Posting to 'app-users' failed: ${error.message}`);
      });
  };

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
