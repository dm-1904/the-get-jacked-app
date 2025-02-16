import { Register } from "../components/register";
import { useNavigate } from "react-router-dom";

export const RegisterPage = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src="/back-arrow.jpeg" // Ensure this path is correct
        alt="Back to Login"
        className="back-button"
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer" }}
      />
      <Register isLoggedIn={isLoggedIn} />
    </div>
  );
};
