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
        placeholder="Enter workout (ex. Chest)"
      />
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
      <div className="select-day-box">
        <span>Select day to do this workout</span>
        <div className="day-checker-box">
          <input
            type="radio"
            id="sun"
            name="day"
            className="day-input"
          />
          <label
            htmlFor="sun"
            className="day-label"
          >
            S
          </label>

          <input
            type="radio"
            id="mon"
            name="day"
            className="day-input"
          />
          <label
            htmlFor="mon"
            className="day-label"
          >
            M
          </label>

          <input
            type="radio"
            id="tues"
            name="day"
            className="day-input"
          />
          <label
            htmlFor="tues"
            className="day-label"
          >
            T
          </label>

          <input
            type="radio"
            id="wed"
            name="day"
            className="day-input"
          />
          <label
            htmlFor="wed"
            className="day-label"
          >
            W
          </label>

          <input
            type="radio"
            id="thurs"
            name="day"
            className="day-input"
          />
          <label
            htmlFor="thurs"
            className="day-label"
          >
            T
          </label>

          <input
            type="radio"
            id="fri"
            name="day"
            className="day-input"
          />
          <label
            htmlFor="fri"
            className="day-label"
          >
            F
          </label>

          <input
            type="radio"
            id="sat"
            name="day"
            className="day-input"
          />
          <label
            htmlFor="sat"
            className="day-label"
          >
            S
          </label>
        </div>
      </div>
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

      <button onClick={handleAddWorkout}>Add Workout to Routine</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};
