import { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";

export type TUserContext = {
  username: string;
  password: string;
  id: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setID: (id: string) => void;
  postUser: (user: string, password: string) => Promise<void>;
};

const CreateUser = createContext<TUserContext | undefined>(undefined);

const CreateUserPro = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { username, password, id } = JSON.parse(storedUser);
      setUsername(username);
      setPassword(password);
      setID(id);
    }
  }, []);

  const idGen = (max: number) => {
    return Math.floor(Math.random() * max).toString();
  };

  const generateUniqueID = async () => {
    const response = await fetch("http://localhost:3000/app-users");
    const users = await response.json();
    const existingIDs = users.map((user: { id: string }) => user.id);

    let newID;
    do {
      newID = idGen(9999999999);
    } while (existingIDs.includes(newID));

    return newID;
  };

  const postUser = async (username: string, password: string) => {
    const newID = await generateUniqueID();
    setID(newID);
    const user = { id: newID, username, password, lastCount: 0 };
    localStorage.setItem("user", JSON.stringify(user));
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
        setID,
        postUser,
        id,
      }}
    >
      {children}
    </CreateUser.Provider>
  );
};

export { CreateUser, CreateUserPro };
