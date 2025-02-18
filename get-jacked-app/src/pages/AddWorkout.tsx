import { useNavigate } from "react-router-dom";
import { EnterWorkout } from "../components/AddWorkout/EnterWorkout";

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
      <img
        className="page-title"
        src="/add-workout.jpeg"
        alt=""
      />
      <EnterWorkout />

      <div className="move-sets-inputs">
        <input
          type="text"
          className="enter-movement"
          placeholder="Enter Movement (ex. Benchpress)"
        />
        <input
          type="text"
          className="enter-sets"
          placeholder="How many sets?"
        />
      </div>

      <div className="rep-box">
        <span>Track 1 Rep Max?</span>
        <input
          type="radio"
          id="rep-y"
          name="rep"
          className="rep-input"
        />
        <label
          htmlFor="rep-y"
          className="rep-label"
        >
          Y
        </label>
        <input
          type="radio"
          id="rep-n"
          name="rep"
          className="rep-input"
        />
        <label
          htmlFor="rep-n"
          className="rep-label"
        >
          N
        </label>
      </div>

      <div className="add-movement-btn">
        <button>Add Movement</button>
      </div>
      <div className="delete-movement-btn">
        <button>Delete Movement</button>
      </div>
      <button onClick={handleAddWorkout}>Add Workout to Routine</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};
