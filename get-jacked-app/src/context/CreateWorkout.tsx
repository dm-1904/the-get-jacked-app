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
  workoutID: string;
  setWorkoutID: (workoutID: string) => void;
  workoutSubmitted: boolean;
  setWorkoutSubmitted: (workoutSubmitted: boolean) => void;
  todaysWorkout: string;
  setTodaysWorkout: (todaysWorkout: string) => void;
  postWorkout: (workout: string, day: string) => Promise<void>;
};

const CreateWorkout = createContext<TWorkoutContex | undefined>(undefined);

const CreateWorkoutPro = ({ children }: { children: ReactNode }) => {
  const [workout, setWorkout] = useState("");
  const [workoutID, setWorkoutID] = useState("");
  // const [oneRep, setOneRep] = useState("");
  const [workoutSubmitted, setWorkoutSubmitted] = useState(false);
  const [todaysWorkout, setTodaysWorkout] = useState("");

  const user = useContext(CreateUser);
  if (!user) {
    throw new Error("CreateUserProvider user not found");
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
    // console.log("post", linkedID);
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
      .then((data) => {
        setWorkoutID(data.id);
        localStorage.setItem(
          "workout",
          JSON.stringify({ ...newWorkout, id: data.id })
        );
        return data;
      })
      .catch((error: Error) => {
        throw new Error(`Posting to 'workouts' failed: ${error.message}`);
      });
  };

  return (
    <CreateWorkout.Provider
      value={{
        workout,
        setWorkout,
        postWorkout,
        workoutID,
        setWorkoutID,
        workoutSubmitted,
        setWorkoutSubmitted,
        todaysWorkout,
        setTodaysWorkout,
      }}
    >
      {children}
    </CreateWorkout.Provider>
  );
};

export { CreateWorkout, CreateWorkoutPro };
