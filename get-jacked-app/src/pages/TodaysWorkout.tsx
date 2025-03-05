import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateWorkout } from "../context/CreateWorkout";

export const TodaysWorkout = () => {
  const [muscleGroup, setMuscleGroup] = useState("");
  const [movements, setMovements] = useState("");
  const workout = useContext(CreateWorkout);
  if (!workout) {
    throw new Error("workout is null");
  }

  const { todaysWorkout, setTodaysWorkout } = workout;

  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/workout-summary");
  };

  useEffect(() => {
    const fetchTodaysWorkout = async () => {
      if (todaysWorkout) {
        try {
          const response = await fetch(
            `http://localhost:3000/workouts/${todaysWorkout}`
          );
          const workoutResponse = await response.json();
          setMuscleGroup(workoutResponse);
          console.log(muscleGroup);
          const moveResponse = await fetch(
            `http://localhost:3000/movements?workoutID=${todaysWorkout}`
          );
          const moveResponseData = await moveResponse.json();
          setMovements(moveResponseData);
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(
              `HTTP request fetchTodaysWorkout failed: ${err.message}`
            );
          }
        }
      }
    };
    fetchTodaysWorkout();
  }, [todaysWorkout]);

  return (
    <div>
      <h3 className="page-title">Today's Workout</h3>
      <h2>5</h2>
      <div>
        This is the Today's Workout page. Here you can see and perform today's
        workout.
      </div>
      <div>{`muscle group ${muscleGroup}`}</div>
      <div>{`movements ${movements}`}</div>
      <button onClick={handleFinish}>Finish</button>
    </div>
  );
};
