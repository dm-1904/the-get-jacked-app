import { useContext, useState, useEffect, useCallback, useRef } from "react";
import { CreateMovement } from "../../context/CreateMovements";
import toast from "react-hot-toast";
import { API } from "../../api";

// const apiKey = import.meta.env.VITE_API_KEY;

interface EnterMovementProps {
  workoutId: string;
}

type Movement = {
  id: string;
  movement: string;
  setsPlanned: number;
  workoutId: string;
};

export const EnterMovement = ({ workoutId }: EnterMovementProps) => {
  const newMovement = useContext(CreateMovement);
  const [inputMovement, setInputMovement] = useState("");
  const [inputSets, setInputSets] = useState<number | string>(0);
  const [movements, setMovements] = useState<Movement[]>([]);
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
    if (Number(inputSets) < 1) {
      toast.error("Sets must be more than 0");
      return;
    }
    const formattedMovement = formattedInput(inputMovement);
    setMovement(formattedMovement);
    setSets(Number(inputSets));
    await postMovementAndSets(formattedMovement, Number(inputSets), workoutId);
    setInputMovement("");
    setInputSets(0);
    fetchMovements();
    movementInputRef.current?.focus();
  };

  const addedMovements = () => {
    return fetch(`${API}/movements`).then((res) => res.json());
  };

  const fetchMovements = useCallback(async () => {
    const movements = await addedMovements();
    const filteredMovements = movements.filter(
      (movement: { workoutId: string }) => movement.workoutId === workoutId
    );
    setMovements(filteredMovements);
  }, [workoutId]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setInputSets(value);
    }
  };

  return (
    <div className="movement-box">
      <form
        action="submit"
        className="enter-workout-form"
        onSubmit={handleNewMovement}
      >
        <label
          htmlFor="enter-movement"
          className="enter-workout-label"
        >
          Enter Movement
        </label>
        <input
          type="text"
          className="enter-workout enter-movement"
          placeholder="ex. Benchpress"
          value={inputMovement}
          onChange={(e) => setInputMovement(e.target.value)}
          ref={movementInputRef}
        />
        <label
          htmlFor="enter-sets"
          className="enter-workout-label"
        >
          Enter Sets
        </label>
        <input
          type="number"
          className="enter-workout enter-sets"
          placeholder="Enter Sets"
          value={inputSets}
          onChange={handleSetsChange}
          onFocus={() => setInputSets("")}
        />
        <button className="add-workout-button schedule-btn">
          Add Movement
        </button>
      </form>
      <div className="added-movements">
        <img
          className="page-title"
          src="/added-movements.jpeg"
          alt=""
        />
        {movements.map(
          (movement: { id: string; movement: string; setsPlanned: number }) => (
            <div
              className="temp-added-movements"
              key={movement.id}
            >
              {movement.movement} - {movement.setsPlanned ?? 0} sets
            </div>
          )
        )}
      </div>
    </div>
  );
};
