import { useContext, useState } from "react";
import { CreateWorkout } from "../../context/CreateWorkout";

export const EnterWorkout = () => {
  const newWorkout = useContext(CreateWorkout);
  const [inputWorkout, setInputWorkout] = useState("");

  if (!newWorkout) {
    throw new Error("newWorkout does not exist");
  }
  const { setWorkout, postWorkout } = newWorkout;

  const handleNewWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    setWorkout(inputWorkout);
    await postWorkout(inputWorkout);
    setInputWorkout("");
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
      <button className="add-workout-button">Add Workout</button>
    </form>
  );
};
