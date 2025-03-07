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
  const [submissions, setSubmissions] = useState<{ [key: string]: number[] }>(
    {}
  );

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
          const initialActive: { [key: string]: number } = {};
          const initialSubmissions: { [key: string]: number[] } = {};
          responseData.forEach((movement: Movement) => {
            initialActive[movement.id] = 0;
            initialSubmissions[movement.id] = [];
          });
          setActiveSets(initialActive);
          setSubmissions(initialSubmissions);
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

  const todaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const postWeight = async (
    movementID: string,
    setNumber: number,
    weight: number,
    date: string
  ) => {
    try {
      const response = await fetch("http://localhost:3000/sets", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ movementID, setNumber, weight, date }),
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
      postWeight(
        movement.id,
        currentSet + 1,
        Number(weightValue),
        todaysDate()
      );
      setSubmissions((prev) => ({
        ...prev,
        [movement.id]: [...(prev[movement.id] || []), Number(weightValue)],
      }));
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
              <ul>
                {Array.from({ length: movement.sets }).map((_, idx) => (
                  <li key={idx}>
                    <span>Set {idx + 1}: </span>
                    {submissions[movement.id] &&
                    submissions[movement.id][idx] !== undefined ? (
                      <span>{submissions[movement.id][idx]}</span>
                    ) : idx === currentSet ? (
                      <div>
                        <input
                          type="number"
                          className="weight-input"
                          value={weight ? weight[movement.id] || "" : ""}
                          placeholder={`Set ${idx + 1}`}
                          onChange={(e) =>
                            setWeight((prev) => ({
                              ...prev,
                              [movement.id]: e.target.value,
                            }))
                          }
                        />
                        <button onClick={() => handleNext(movement)}>
                          Submit
                        </button>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </li>
                ))}
              </ul>
              {currentSet >= movement.sets && <p>All sets completed!</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
