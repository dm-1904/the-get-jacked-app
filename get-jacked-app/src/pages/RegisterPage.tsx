import { Register } from "../components/register";

export const RegisterPage = ({
  setDependency,
  isLoggedIn,
}: {
  setDependency: (value: (prev: number) => number) => void;
  isLoggedIn: boolean;
}) => {
  return (
    <div>
      <h1>Register</h1>
      <Register
        setDependency={setDependency}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};
