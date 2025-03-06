import { useContext, useEffect, useState } from "react";
import { CreateWorkout } from "../context/CreateWorkout";

// interface WeightDetails {
//   weight: number;
// }

interface Movement {
  id: string;
  movement: string;
  sets: number;
}

export const EnterWeight = () => {
  // const [weight, setWeight] = useState<WeightDetails | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  // const [activeSets, setActiveSets] = useState<{[key: string]: number}>({})

  const workout = useContext(CreateWorkout);
  if (!workout) {
    throw new Error("workout is null");
  }

  const { todaysWorkout } = workout;

  useEffect(() => {
    const fetchTodaysMovement = async () => {
      if (todaysWorkout) {
        try {
          const response = await fetch(
            `http://localhost:3000/movements?workoutID=${todaysWorkout}`
          );
          const responseData = await response.json();
          setMovements(responseData);
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

  // const postWeight = async (movementID: string, setNumber: number, weight: number) => {

  // }

  return (
    <div>
      {/* <input
        type="text"
        className="weight-input"
      /> */}
      <div className="movements-list">
        {movements.map((movement) => (
          <>
            <p className="movement-name">{movement.movement}</p>
            {Array.from({ length: movement.sets }).map((_, index) => (
              <input
                key={index}
                type="text"
                className="weight-input"
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
};
