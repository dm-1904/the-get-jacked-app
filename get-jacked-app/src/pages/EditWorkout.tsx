import { useNavigate } from "react-router-dom";

export const EditWorkout = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/workout-schedule");
  };

  return (
    <div>
      <h3 className="page-title">Edit Workout</h3>
      <h2>3</h2>
      <div>
        This is the Edit Workout page. Here you can edit your workout details.
        this will be specific to an individual workout. Chest for example.
      </div>
      <button onClick={handleDone}>Done</button>
    </div>
  );
};
