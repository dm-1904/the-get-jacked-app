import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CreateUser } from "./CreateUser";

export type TWorkoutContex = {
  workout: string;
  setWorkout: (workout: string) => void;
  postWorkout: (workout: string, day: string) => Promise<void>;
};

const CreateWorkout = createContext<TWorkoutContex | undefined>(undefined);

const CreateWorkoutPro = ({ children }: { children: ReactNode }) => {
  const [workout, setWorkout] = useState("");
  // const [oneRep, setOneRep] = useState("");

  const user = useContext(CreateUser);
  if (!user) {
    throw new Error("CreateWorkoutProvider user not found");
  }
  const { setUserID } = user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { id } = JSON.parse(storedUser);
      setUserID(id);
    }
  }, [setUserID]);

  const postWorkout = async (workout: string, day: string) => {
    const storedUser = localStorage.getItem("user");
    const { id: linkedID } = storedUser ? JSON.parse(storedUser) : { id: null };
    console.log("post", linkedID);
    const newWorkout = { workout, userID: linkedID, day };
    return fetch("http://localhost:3000/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP POST failed with status ${res.status}`);
        }
        return res.json();
      })
      .catch((error: Error) => {
        throw new Error(`Posting to 'workouts' failed: ${error.message}`);
      });
  };

  return (
    <CreateWorkout.Provider value={{ workout, setWorkout, postWorkout }}>
      {children}
    </CreateWorkout.Provider>
  );
};

export { CreateWorkout, CreateWorkoutPro };
