import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CreateUser } from "../context/CreateUser";
import { Link, useNavigate } from "react-router-dom";

export const Login = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const auth = useContext(CreateUser);
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  if (!auth) {
    throw new Error("Login auth error");
  }

  const { setUsername, setPassword, setID } = auth;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/app-users");
    const users = await response.json();
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === inputUsername && u.password === inputPassword
    );

    if (user) {
      setUsername(user.username);
      setPassword(user.password);
      setID(user.id.toString());
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("count", user.lastCount.toString());
      toast.success(`Welcome ${user.username}`);
      navigate("/dashboard"); // Navigate to the Dashboard page
    } else {
      toast.error("Invalid username or password");
    }

    setInputUsername("");
    setInputPassword("");
  };

  return (
    <div className="login-box">
      <img
        src="/main-img.jpeg"
        alt=""
        className="main-img"
      />
      <img
        className="login-img"
        src="/login.jpeg"
        alt=""
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
          className="login-button"
          disabled={isLoggedIn}
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link
          to="/register"
          className="register-link"
        >
          Register Here
        </Link>
      </p>
    </div>
  );
};
