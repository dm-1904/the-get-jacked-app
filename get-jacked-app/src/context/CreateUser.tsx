import { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";

export type TUserContext = {
  username: string;
  password: string;
  activeUser: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setActiveUser: (activeUser: string) => void;
  postUser: (user: string, password: string) => Promise<void>;
};

const CreateUser = createContext<TUserContext | undefined>(undefined);

const CreateUserPro = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { username, password } = JSON.parse(storedUser);
      setUsername(username);
      setPassword(password);
      setActiveUser(username);
    }
  }, []);

  const postUser = async (username: string, password: string) => {
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    setActiveUser(username);
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
      .catch((error: Error) => {
        throw new Error(`Posting to 'app-users' failed: ${error.message}`);
      });
  };

  return (
    <CreateUser.Provider
      value={{
        username,
        password,
        setUsername,
        setPassword,
        postUser,
        activeUser,
        setActiveUser,
      }}
    >
      {children}
    </CreateUser.Provider>
  );
};

export { CreateUser, CreateUserPro };
