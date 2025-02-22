import { useContext, useState } from "react";
import { CreateWorkout } from "../../context/CreateWorkout";
import { toast } from "react-hot-toast";

export const EnterWorkout = ({ onSubmit }: { onSubmit: () => void }) => {
  const newWorkout = useContext(CreateWorkout);
  const [inputWorkout, setInputWorkout] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  if (!newWorkout) {
    throw new Error("newWorkout does not exist");
  }
  const { setWorkout, postWorkout } = newWorkout;

  const formattedInput = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  };

  const handleNewWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputWorkout) {
      toast.error("Please enter a workout.");
      return;
    }
    if (!selectedDay) {
      toast.error("Please select a day.");
      return;
    }
    const formattedWorkout = formattedInput(inputWorkout);
    setWorkout(formattedWorkout);
    await postWorkout(formattedWorkout, selectedDay);
    setInputWorkout("");
    setSelectedDay("");
    onSubmit();
  };

  return (
    <form
      action="submit"
      className="enter-workout-form"
      onSubmit={handleNewWorkout}
    >
      <input
        type="text"
        className="enter-workout"
        placeholder="Enter workout (ex. Chest)"
        value={inputWorkout}
        onChange={(e) => setInputWorkout(e.target.value)}
      />
      <div className="select-day-box">
        <span>Select day to do this workout</span>
        <div className="day-checker-box">
          <input
            type="radio"
            id="sun"
            name="day"
            className="day-input"
            value="Sunday"
            checked={selectedDay === "Sunday"}
            onChange={(e) => setSelectedDay(e.target.value)}
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
            value="Monday"
            checked={selectedDay === "Monday"}
            onChange={(e) => setSelectedDay(e.target.value)}
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
            value="Tuesday"
            checked={selectedDay === "Tuesday"}
            onChange={(e) => setSelectedDay(e.target.value)}
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
            value="Wednesday"
            checked={selectedDay === "Wednesday"}
            onChange={(e) => setSelectedDay(e.target.value)}
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
            value="Thursday"
            checked={selectedDay === "Thursday"}
            onChange={(e) => setSelectedDay(e.target.value)}
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
            value="Friday"
            checked={selectedDay === "Friday"}
            onChange={(e) => setSelectedDay(e.target.value)}
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
            value="Saturday"
            checked={selectedDay === "Saturday"}
            onChange={(e) => setSelectedDay(e.target.value)}
          />
          <label
            htmlFor="sat"
            className="day-label"
          >
            S
          </label>
        </div>
      </div>
      <button className="add-workout-button schedule-btn">Add Workout</button>
    </form>
  );
};
