import { SetHistory } from "./components/enterWeight";
import { TMovementContext } from "./context/CreateMovements";
// import { TUserContext } from "./context/CreateUser";
import { TWorkoutContex } from "./context/CreateWorkout";

const API = import.meta.env.VITE_API_URL;

// export type User = { id: string; username: string };
export interface UserRow {
  id: string;
  username: string;
}

async function request<T>(path: string, options: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || res.statusText);
  }
  return res.json() as Promise<T>;
}

export const createUser = (username: string, password: string) => {
  return request<UserRow>("/users", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

export const createWorkout = (data: {
  workout: string;
  day: string;
  userID: string;
}) =>
  request<TWorkoutContex>("/workouts", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const createMovement = (data: {
  movement: string;
  sets: number;
  workoutID: string;
}) =>
  request<TMovementContext>("/movements", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const createSet = (data: {
  movementID: string;
  setNumber: number;
  weight: number;
  date: string;
}) =>
  request<SetHistory>("/sets", { method: "POST", body: JSON.stringify(data) });
