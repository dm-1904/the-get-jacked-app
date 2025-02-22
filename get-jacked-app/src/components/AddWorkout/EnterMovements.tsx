import { useContext, useState, useEffect, useCallback, useRef } from "react";
import { CreateMovement } from "../../context/CreateMovements";
import toast from "react-hot-toast";

export const EnterMovement = () => {
  const newMovement = useContext(CreateMovement);
  const [inputMovement, setInputMovement] = useState("");
  const [inputSets, setInputSets] = useState(0);
  const [movements, setMovements] = useState([]);
  const movementInputRef = useRef<HTMLInputElement>(null);

  if (!newMovement) {
    throw new Error("newMovement does not exist");
  }
  const { setMovement, setSets, postMovementAndSets } = newMovement;

  const formattedInput = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  };

  const handleNewMovement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMovement) {
      toast.error("Please enter a movement");
      return;
    }
    if (inputSets < 1) {
      toast.error("Sets must be more than 0");
      return;
    }
    const formattedMovement = formattedInput(inputMovement);
    setMovement(formattedMovement);
    setSets(inputSets);
    await postMovementAndSets(formattedMovement, inputSets);
    setInputMovement("");
    setInputSets(0);
    fetchMovements();
    movementInputRef.current?.focus();
  };

  const addedMovements = () => {
    return fetch("http://localhost:3000/movements").then((res) => res.json());
  };

  const lastAddedWorkoutID = async () => {
    const response = await fetch("http://localhost:3000/workouts");
    const workouts = await response.json();
    const lastWorkout = workouts[workouts.length - 1];
    return lastWorkout.id;
  };

  const fetchMovements = useCallback(async () => {
    const movements = await addedMovements();
    const filterID = await lastAddedWorkoutID();
    const filteredMovements = movements.filter(
      (movement: { workoutID: number }) => movement.workoutID === filterID
    );
    setMovements(filteredMovements);
  }, []);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return (
    <div className="movement-box">
      <form
        action="submit"
        className="enter-workout-form"
        onSubmit={handleNewMovement}
      >
        <input
          type="text"
          className="enter-workout enter-movement"
          placeholder="Enter Movement"
          value={inputMovement}
          onChange={(e) => setInputMovement(e.target.value)}
          ref={movementInputRef}
        />
        <input
          type="number"
          className="enter-workout enter-sets"
          value={inputSets}
          onChange={(e) => setInputSets(Number(e.target.value))}
        />
        <button className="add-workout-button">Add Movement</button>
      </form>
      <div className="added-movements">
        <img
          className="page-title"
          src="/added-movements.jpeg"
          alt=""
        />
        {movements.map(
          (movement: { id: number; movement: string; sets: number }) => (
            <div key={movement.id}>
              {movement.movement} - {movement.sets} sets
            </div>
          )
        )}
      </div>
    </div>
  );
};
