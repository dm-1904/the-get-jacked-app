import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../context/CreateUser";
// import { toast } from "react-hot-toast";

export const Register = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const navigate = useNavigate();
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
    navigate("/add-workout");
  };

  return (
    <div className="register-box">
      <img
        src="/main-img.jpeg"
        alt=""
        className="main-img"
      />
      <img
        src="/register.jpeg"
        alt=""
        className="register-img"
      />
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
        <button
          className="register-button"
          disabled={isLoggedIn}
        >
          Register
        </button>
      </form>
    </div>
  );
};
