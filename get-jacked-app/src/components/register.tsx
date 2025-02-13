import { useContext, useState } from "react";
import { CreateUser } from "../context/CreateUser";
import { useNavigate } from "react-router-dom";

export const Register = ({
  setDependency,
  isLoggedIn,
}: {
  setDependency: (value: (prev: number) => number) => void;
  isLoggedIn: boolean;
}) => {
  const auth = useContext(CreateUser);
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  if (!auth) {
    throw new Error("Login auth error");
  }

  const { setUsername, setPassword, postUser, setActiveUser } = auth;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(inputUsername);
    setPassword(inputPassword);
    await postUser(inputUsername, inputPassword);
    setInputUsername("");
    setInputPassword("");
    setDependency((prev) => prev + 1);
    setActiveUser(inputUsername);
    navigate("/workout-schedule");
  };

  return (
    <div className="register-box">
      <img
        src="/main-img.jpeg"
        alt="Main"
        className="main-img"
      />
      <img
        src="/register.jpeg"
        alt="Register"
        className="register-img"
      />
      <form
        action="submit"
        className="register-form"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          className="user-input"
          placeholder="Create Username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          disabled={isLoggedIn}
        />
        <input
          type="password"
          className="password-input"
          placeholder="Create Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          disabled={isLoggedIn}
        />
        <button
          className="register-button"
          disabled={isLoggedIn}
        >
          Get Started!
        </button>
      </form>
    </div>
  );
};
