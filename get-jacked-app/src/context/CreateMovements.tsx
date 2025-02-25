import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CreateWorkout } from "./CreateWorkout";

export type TMovementContext = {
  movement: string;
  setMovement: (movement: string) => void;
  sets: number;
  setSets: (sets: number) => void;
  editWorkoutID: string;
  setEditWorkoutID: (editWorkoutID: string) => void;
  postMovementAndSets: (
    movement: string,
    sets: number,
    workoutID: string
  ) => Promise<void>;
};

const CreateMovement = createContext<TMovementContext | undefined>(undefined);

const CreateMovementPro = ({ children }: { children: ReactNode }) => {
  const [movement, setMovement] = useState("");
  const [sets, setSets] = useState(0);
  const [editWorkoutID, setEditWorkoutID] = useState("");

  const useWorkout = useContext(CreateWorkout);
  if (!useWorkout) {
    throw new Error("CreateWorkoutProvider not found");
  }
  // const { workout, workoutID, setWorkoutID } = useWorkout;
  const { setWorkoutID } = useWorkout;

  useEffect(() => {
    const storedWorkout = localStorage.getItem("workout");
    if (storedWorkout) {
      const { id } = JSON.parse(storedWorkout);
      setWorkoutID(id);
    }
  }, [setWorkoutID]);

  const postMovementAndSets = async (
    movement: string,
    sets: number,
    workoutID: string
  ) => {
    const newMovement = { movement, workoutID, sets };
    return fetch("http://localhost:3000/movements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovement),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP POST failed with status ${res.status}`);
        }
        return res.json();
      })
      .catch((error: Error) => {
        throw new Error(`Posting to 'movements' failed: ${error.message}`);
      });
  };

  return (
    <CreateMovement.Provider
      value={{
        movement,
        setMovement,
        sets,
        setSets,
        postMovementAndSets,
        editWorkoutID,
        setEditWorkoutID,
      }}
    >
      {children}
    </CreateMovement.Provider>
  );
};

export { CreateMovement, CreateMovementPro };
