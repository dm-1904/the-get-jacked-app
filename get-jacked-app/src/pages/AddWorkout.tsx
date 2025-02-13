import { useNavigate } from "react-router-dom";

export const AddWorkout = () => {
  const navigate = useNavigate();

  const handleAddWorkout = () => {
    // Add workout to routine logic here
    navigate("/workout-schedule");
  };

  const handleBack = () => {
    navigate("/workout-schedule");
  };

  return (
    <div>
      <h3 className="page-title">Add Workout 4</h3>
      <input
        type="text"
        className="enter-workout"
        placeholder="Enter workout (ex. chest)"
      />
      <div className="1-rep-box">
        <input
          type="radio"
          id="1-rep-y"
          name="1-rep"
        />
        <label htmlFor="i-rep-y">Y</label>
        <input
          type="radio"
          id="1-rep-n"
          name="1-rep"
        />
        <label htmlFor="i-rep-n">N</label>
      </div>
      <button onClick={handleAddWorkout}>Add Workout to Routine</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};
