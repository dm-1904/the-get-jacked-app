import { createContext, useContext } from "react";
import { CreateUser } from "../../context/CreateUser";

export type TWorkout = {
  workout: string;
};

const CreateWorkout = createContext<TWorkout | undefined>(undefined);

export const EnterWorkoutInput = () => {
  const user = useContext(CreateUser);
};
