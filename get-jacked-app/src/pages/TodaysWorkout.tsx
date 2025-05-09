import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateWorkout } from "../context/CreateWorkout";
import { EnterWeight } from "../components/enterWeight";
import { API } from "../api";

// const API = import.meta.env.VITE_API_KEY;

interface Movement {
  id: string;
  movement: string;
  sets: number;
}

export const TodaysWorkout = () => {
  const [muscleGroup, setMuscleGroup] = useState<string>("");
  const [movements, setMovements] = useState<Movement[]>([]);
  const [allSetsCompleted, setAllSetsCompleted] = useState(false);

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
          const response = await fetch(`${API}/workouts/${todaysWorkout}`);
          const workoutResponse = await response.json();
          setMuscleGroup(workoutResponse.workout);
          const moveResponse = await fetch(
            `${API}/movements?workoutID=${todaysWorkout}`
          );
          const moveResponseData = await moveResponse.json();
          setMovements(moveResponseData);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(
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
      <img
        src="/today-workout.png"
        className="page-title"
        alt=""
      />
      <h2 className="todays-workout-header">{muscleGroup}</h2>
      <div className="movements-list">
        {movements.length > 0 ? (
          movements.map((movement) => (
            <p key={movement.id}>
              {movement.movement} - {movement.sets} sets
            </p>
          ))
        ) : (
          <p>No movements found for today's workout.</p>
        )}
      </div>
      <EnterWeight onAllSetsCompleted={setAllSetsCompleted} />
      <button
        className="todays-workout-finish-btn"
        onClick={handleFinish}
        disabled={!allSetsCompleted}
      >
        Finish
      </button>
    </div>
  );
};
