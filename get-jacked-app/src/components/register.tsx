import { useContext, useState } from "react";
import { CreateUser } from "../context/CreateUser";

export const Register = ({
  setDependency,
  isLoggedIn,
}: {
  setDependency: (value: (prev: number) => number) => void;
  isLoggedIn: boolean;
}) => {
  const auth = useContext(CreateUser);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  if (!auth) {
    throw new Error("Login auth error");
  }

  const { setUsername, setPassword, postUser } = auth;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(inputUsername);
    setPassword(inputPassword);
    await postUser(inputUsername, inputPassword);
    setInputUsername("");
    setInputPassword("");
    setDependency((prev) => prev + 1);
  };

  return (
    <div className="login-box">
      <h2>Register</h2>
      <form
        action="submit"
        className="login-form"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          className="user-input"
          placeholder="Username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          disabled={isLoggedIn}
        />
        <input
          type="password"
          className="password-input"
          placeholder="Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          disabled={isLoggedIn}
        />
        <button disabled={isLoggedIn}>Register</button>
      </form>
    </div>
  );
};
