import { useContext, useState } from "react";
import { CreateMovement } from "../../context/CreateMovements";
import toast from "react-hot-toast";

export const EnterMovement = () => {
  const newMovement = useContext(CreateMovement);
  const [inputMovement, setInputMovement] = useState("");
  const [inputSets, setInputSets] = useState(0);

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
  };

  return (
    <div className="movement-box">
      <form
        action="submit"
        className="enter-workout-form"
        onSubmit={handleNewMovement}
      >
        <input
          type="text"
          className="enter-workout"
          placeholder="Enter Movement"
          value={inputMovement}
          onChange={(e) => setInputMovement(e.target.value)}
        />
        <input
          type="number"
          className="enter-workout"
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
      </div>
    </div>
  );
};
