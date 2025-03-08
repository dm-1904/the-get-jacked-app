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

interface SetHistory {
  movementID: string;
  setNumber: number;
  weight: number;
  date: string;
}

export const EnterWeight = ({
  onAllSetsCompleted,
}: {
  onAllSetsCompleted: (completed: boolean) => void;
}) => {
  const [weight, setWeight] = useState<WeightDetails | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [activeSets, setActiveSets] = useState<{ [key: string]: number }>({});
  const [submissions, setSubmissions] = useState<{ [key: string]: number[] }>(
    {}
  );

  const [lastSetHistory, setLastSetHistory] = useState<SetHistory[]>([]);

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

  useEffect(() => {
    const lastWorkout = async () => {
      const today = todaysDate();
      let lastWorkoutDate: string | undefined;
      try {
        const response = await fetch("http://localhost:3000/sets");
        const responseData = await response.json();
        for (let i = responseData.length - 1; i >= 0; i--) {
          if (responseData[i].date < today) {
            lastWorkoutDate = responseData[i].date;
            break;
          }
        }
        const filteredData = responseData.filter(
          (set: { date: string }) => set.date === lastWorkoutDate
        );
        setLastSetHistory(filteredData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`HTTP request lastWorkout failed: ${err.message}`);
        }
      }
    };

    lastWorkout();
  }, []);

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

  useEffect(() => {
    const allSetsCompleted = movements.every(
      (movement) => activeSets[movement.id] >= movement.sets
    );
    onAllSetsCompleted(allSetsCompleted);
  }, [activeSets, movements, onAllSetsCompleted]);

  return (
    <div>
      <div className="movements-list">
        {movements.map((movement) => {
          const currentSet = activeSets[movement.id] || 0;
          const submittedWeights = submissions[movement.id] || [];
          return (
            <div
              key={movement.id}
              className="movement"
            >
              <p className="movement-name">{movement.movement}</p>
              <ul className="set-list">
                {Array.from({ length: movement.sets }).map((_, idx) => (
                  <li key={idx}>
                    <span>Set {idx + 1}: </span>
                    {submittedWeights[idx] !== undefined ? (
                      <span>{submittedWeights[idx]}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </li>
                ))}
              </ul>
              <span className="your-last-workout">Your Last Workout</span>
              <div className="set-history">
                {lastSetHistory
                  .filter((set) => set.movementID === movement.id)
                  .map((set, index) => (
                    <p key={index}>
                      Set {set.setNumber} - {set.weight}
                    </p>
                  ))}
              </div>

              {currentSet < movement.sets ? (
                <div className="set-input">
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
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleNext(movement);
                      }
                    }}
                  />
                  <button
                    className="weight-submit-button"
                    onClick={() => handleNext(movement)}
                  >
                    Submit
                  </button>
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
