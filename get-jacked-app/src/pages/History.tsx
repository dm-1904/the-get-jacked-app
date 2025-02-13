import { useNavigate } from "react-router-dom";

export const History = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h3 className="page-title">History</h3>
      <h2>7</h2>
      <div>
        This is the History page. Here you can see the history of your chest
        workouts.
      </div>
      <button onClick={handleDone}>Done</button>
    </div>
  );
};
