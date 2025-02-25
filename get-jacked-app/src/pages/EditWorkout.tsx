import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateMovement } from "../context/CreateMovements";
import { EnterMovement } from "../components/AddWorkout/EnterMovements";

interface WorkoutDetails {
  workout: string;
}

interface MovementDetails {
  id: string;
  movement: string;
  sets: number;
}

export const EditWorkout = () => {
  const navigate = useNavigate();
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails | null>(
    null
  );
  const [movementDetails, setMovementDetails] = useState<MovementDetails[]>([]);
  const [addMovement, setAddMovement] = useState(false);

  const workoutEdit = useContext(CreateMovement);
  if (!workoutEdit) {
    throw new Error("workoutEdit is null");
  }

  const { editWorkoutID, setEditWorkoutID } = workoutEdit;

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      if (editWorkoutID) {
        try {
          const workoutNameResponse = await fetch(
            `http://localhost:3000/workouts/${editWorkoutID}`
          );
          const nameData = await workoutNameResponse.json();
          setWorkoutDetails(nameData);
          const movementDetailsResponse = await fetch(
            `http://localhost:3000/movements?workoutID=${editWorkoutID}`
          );
          const movementData = await movementDetailsResponse.json();
          setMovementDetails(movementData);
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(
              `HTTP request fetchWorkoutDetails failed: ${err.message}`
            );
          }
        }
      }
    };
    fetchWorkoutDetails();
  }, [editWorkoutID]);

  const handleDone = () => {
    setAddMovement(false);
    navigate("/dashboard");
  };

  const handleDelete = (endpoint: string, id: string) => {
    return fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setMovementDetails((prevMovements) =>
          prevMovements.filter((movement) => movement.id !== id)
        );
      })
      .catch((err: Error) => {
        throw new Error(`HTTP request handleDelete failed: ${err.message}`);
      });
  };

  const handleDeleteWorkout = async () => {
    if (!workoutDetails) return;
    try {
      await Promise.all(
        movementDetails.map((movement) =>
          fetch(`http://localhost:3000/movements/${movement.id}`, {
            method: "DELETE",
          })
        )
      );
      await fetch(
        `http://localhost:3000/workouts/${workoutEdit.editWorkoutID}`,
        {
          method: "DELETE",
        }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting workout and movements:", err);
    }
  };

  const handleNewMovements = () => {
    setEditWorkoutID(editWorkoutID);
    setAddMovement(true);
  };

  return (
    <div>
      <img
        src="/edit-workout.jpeg"
        className="page-title"
        alt=""
      />
      <div className="warning-box">
        <h1 className="warning">WARNING</h1>
        <p className="warning-content">
          Deleting a workout will delete all of its saved data. <br />
          This cannot be undone!
        </p>
      </div>
      {workoutDetails ? (
        <div>
          <h2 className="edit-workout-workout-header">
            {workoutDetails.workout}
          </h2>
          <div className="edit-workout-movement-box">
            <div className="edit-workout-workout-movements">
              {movementDetails.map((movement) => (
                <div
                  className="movement-map"
                  key={movement.id}
                >
                  <p className="edit-workout-movements">
                    {movement.movement} - {movement.sets} sets
                  </p>

                  <button
                    onClick={() => handleDelete("movements", movement.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          {!addMovement && (
            <div className="delete-add-buttons">
              <button
                onClick={handleDeleteWorkout}
                className="delete-entire-workout"
              >
                Delete Entire Workout
              </button>

              <button
                onClick={handleNewMovements}
                className="add-movement"
              >
                Add Movement
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading workout details...</p>
      )}
      <button
        className="schedule-buttons"
        onClick={handleDone}
      >
        Done
      </button>
      {addMovement && <EnterMovement />}
    </div>
  );
};
