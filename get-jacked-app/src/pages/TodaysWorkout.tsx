import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateWorkout } from "../context/CreateWorkout";

interface Movement {
  id: string;
  movement: string;
  sets: number;
}

export const TodaysWorkout = () => {
  const [muscleGroup, setMuscleGroup] = useState<string>("");
  const [movements, setMovements] = useState<Movement[]>([]);
  const workout = useContext(CreateWorkout);
  if (!workout) {
    throw new Error("workout is null");
  }

  const { todaysWorkout } = workout;

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
          setMuscleGroup(workoutResponse.workout);
          const moveResponse = await fetch(
            `http://localhost:3000/movements?workoutID=${todaysWorkout}`
          );
          const moveResponseData = await moveResponse.json();
          setMovements(moveResponseData);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(
              `HTTP request fetchTodaysWorkout failed: ${err.message}`
            );
          } else {
            console.error("HTTP request fetchTodaysWorkout failed");
          }
        }
      }
    };
    fetchTodaysWorkout();
  }, [todaysWorkout]);

  return (
    <div>
      <img
        src="/today-workout.png"
        className="page-title"
        alt=""
      />
      <h2>{muscleGroup}</h2>
      <div>
        This is the Today's Workout page. Here you can see and perform today's
        workout.
      </div>
      <div className="movements-list">
        {movements.map((movement) => (
          <p key={movement.id}>
            {movement.movement} - {movement.sets} sets
          </p>
        ))}
      </div>
      <button onClick={handleFinish}>Finish</button>
    </div>
  );
};
