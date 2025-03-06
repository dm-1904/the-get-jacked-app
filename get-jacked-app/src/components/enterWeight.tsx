import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateWorkout } from "../context/CreateWorkout";

interface WeightDetails {
  weight: number;
}

export const EnterWeight = () => {
  const [weight, setWeight] = useState<WeightDetails | null>(null);

  const workout = useContext(CreateWorkout);
  if (!workout) {
    throw new Error("workout is null");
  }

  const { todaysWorkout } = workout;

  return (
    <div>
      <input
        type="text"
        className="weight-input"
      />
    </div>
  );
};
