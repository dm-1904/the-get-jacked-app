import { useContext, useEffect, useState } from "react";
import { CreateWorkout } from "../context/CreateWorkout";

interface WeightDetails {
  [key: string]: number | string;
}

interface Movement {
  id: string;
  movement: string;
  sets: number;
}

export const EnterWeight = () => {
  const [weight, setWeight] = useState<WeightDetails | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [activeSets, setActiveSets] = useState<{ [key: string]: number }>({});

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

  const postWeight = async (
    movementID: string,
    setNumber: number,
    weight: number
  ) => {
    try {
      const response = await fetch("http://localhost:3000/sets", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ movementID, setNumber, weight }),
      });
      await response.json();
    } catch (error) {
      throw new Error(`postWeight failed: ${error}`);
    }
  };

  const handleNext = (movement: Movement) => {
    const currentSet = activeSets[movement.id];
    const weightValue = weight ? weight[movement.id] : null;
    if (weightValue && !isNaN(Number(weightValue))) {
      postWeight(movement.id, currentSet + 1, Number(weightValue));
      setActiveSets((prev) => ({ ...prev, [movement.id]: currentSet + 1 }));
      setWeight((prev: WeightDetails | null) => ({
        ...prev,
        [movement.id]: "",
      }));
    }
  };

  return (
    <div>
      <div className="movements-list">
        {movements.map((movement) => {
          const currentSet = activeSets[movement.id] || 0;
          return (
            <div key={movement.id}>
              <p className="movement-name">{movement.movement}</p>
              {currentSet < movement.sets ? (
                <div>
                  <input
                    type="number"
                    className="weight-input"
                    value={weight ? weight[movement.id] || "" : ""}
                    placeholder={`Set ${currentSet + 1}`}
                    onChange={(e) =>
                      setWeight((prev) => ({
                        ...prev,
                        [movement.id]: e.target.value,
                      }))
                    }
                  />
                  <button onClick={() => handleNext(movement)}>Next</button>
                </div>
              ) : (
                <p>All sets completed!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
