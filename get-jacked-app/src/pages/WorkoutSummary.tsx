import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateWorkout } from "../context/CreateWorkout";

interface Movement {
  id: string;
  movement: string;
  sets: number;
}

interface SetHistory {
  movementID: string;
  setNumber: number;
  weight: number;
  date: string;
}

export const WorkoutSummary = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [setHistory, setSetHistory] = useState<SetHistory[]>([]);
  const [workoutName, setWorkoutName] = useState<string>("");

  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/dashboard");
  };

  const workout = useContext(CreateWorkout);
  if (!workout) {
    throw new Error("workout is null");
  }

  const { todaysWorkout } = workout;

  useEffect(() => {
    const fetchTodaysMovement = async () => {
      if (todaysWorkout) {
        try {
          const workoutResponse = await fetch(
            `http://localhost:3000/workouts/${todaysWorkout}`
          );
          const workoutData = await workoutResponse.json();
          setWorkoutName(workoutData.workout);

          const movementsResponse = await fetch(
            `http://localhost:3000/movements?workoutID=${todaysWorkout}`
          );
          const movementsData = await movementsResponse.json();
          setMovements(movementsData);

          const setsResponse = await fetch("http://localhost:3000/sets");
          const setsData = await setsResponse.json();
          const filteredSets = setsData.filter((set: SetHistory) =>
            movementsData.some((m: Movement) => m.id === set.movementID)
          );
          setSetHistory(filteredSets);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(
              `HTTP request fetchTodaysMovement failed: ${err.message}`
            );
          }
        }
      }
    };
    fetchTodaysMovement();
  }, [todaysWorkout]);

  const groupSetsByDate = (sets: SetHistory[]) => {
    return sets.reduce((acc: { [date: string]: SetHistory[] }, set) => {
      if (!acc[set.date]) {
        acc[set.date] = [];
      }
      acc[set.date].push(set);
      return acc;
    }, {});
  };

  return (
    <div>
      <img
        src="/workout-summary.png"
        alt=""
        className="page-title"
      />
      <h2 className="summary-workout-name">{workoutName}</h2>
      <div>
        {movements.map((movement) => {
          const movementSets = setHistory.filter(
            (set) => set.movementID === movement.id
          );
          const setsByDate = groupSetsByDate(movementSets);
          return (
            <div key={movement.id}>
              <p className="summary-movement">{movement.movement}</p>
              {Object.entries(setsByDate).map(([date, sets]) => {
                const totalWeight = sets.reduce(
                  (total, set) => total + set.weight,
                  0
                );
                return (
                  <div key={date}>
                    <p className="summary-date">Date: {date}</p>
                    <ul className="summary-set-history">
                      {sets.map((set) => (
                        <li
                          className="summary-set"
                          key={set.setNumber}
                        >
                          {set.weight} lbs
                        </li>
                      ))}
                    </ul>
                    <p className="summary-weight">
                      Total Weight: {totalWeight} lbs
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button onClick={handleDone}>Done</button>
    </div>
  );
};
