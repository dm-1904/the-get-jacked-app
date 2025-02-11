import { Register } from "../components/register";
import { useNavigate } from "react-router-dom";

export const RegisterPage = ({
  setDependency,
  isLoggedIn,
}: {
  setDependency: (value: (prev: number) => number) => void;
  isLoggedIn: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src="/back-arrow.jpeg" // Replace with the path to your back button image
        alt="Back to Login"
        className="back-button"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <Register
        setDependency={setDependency}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};
