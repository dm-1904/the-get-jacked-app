import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateMovement } from "../context/CreateMovements";

export const Dashboard = () => {
  const [workoutList, setWorkoutList] = useState([]);
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(
    null
  );

  interface Movement {
    id: string;
    workoutID: string;
    movement: string;
    sets: number;
  }

  const [movementsList, setMovementsList] = useState<Movement[]>([]);
  const navigate = useNavigate();

  const workoutEdit = useContext(CreateMovement);
  if (!workoutEdit) {
    throw new Error("workoutEdit is null");
  }

  const { setEditWorkoutID } = workoutEdit;

  const handleEdit = (workoutId: string) => {
    setEditWorkoutID(workoutId);
    navigate("/edit-workout");
  };

  const handleAddWorkout = () => {
    navigate("/add-workout");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("workout");
    navigate("/");
  };

  const getWorkouts = () => {
    return fetch("http://localhost:3000/workouts")
      .then((res) => res.json())
      .catch((err: Error) => {
        throw new Error(`HTTP request getWorkouts failed ${err.message}`);
      });
  };

  const verifyUser = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).id : null;
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workouts = await getWorkouts();
        const userID = verifyUser();
        const userWorkouts = workouts.filter((workout: { userID: string }) => {
          return workout.userID === userID;
        });
        setWorkoutList(userWorkouts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWorkouts();
  }, []);

  const toggleExpand = (workoutId: string) => {
    setExpandedWorkoutId((prev) => (prev === workoutId ? null : workoutId));
  };

  const getMovements = () => {
    return fetch("http://localhost:3000/movements")
      .then((res) => res.json())
      .catch((err: Error) => {
        throw new Error(`HTTP request getMovements failed ${err.message}`);
      });
  };

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const movements = await getMovements();
        setMovementsList(movements);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovements();
  }, []);

  return (
    <div>
      <img
        src="/workout-schedule.jpeg"
        alt=""
        className="page-title"
      />
      <div>
        This is the dashboard. It shows the active user's current workout
        schedule.
      </div>
      <div className="workout-list">
        {workoutList.length > 0 ? (
          workoutList.map(
            (workout: { id: string; workout: string; day: string }) => (
              <div
                onClick={() => toggleExpand(workout.id)}
                className="workout-list-box"
                key={workout.id}
              >
                <p className="workout-list-item">
                  {workout.day} - {workout.workout}
                </p>
                {expandedWorkoutId === workout.id && (
                  <div className="movements-list">
                    {movementsList
                      .filter(
                        (movement: Movement) =>
                          movement.workoutID === workout.id
                      )
                      .map((movement: Movement) => (
                        <p key={movement.id}>
                          {movement.movement} - {movement.sets} sets
                        </p>
                      ))}
                    <div className="workout-list-btn-box">
                      <button
                        onClick={() => handleEdit(workout.id)}
                        className="workout-list-edit-btn"
                      >
                        Edit Workout
                      </button>
                      <button className="workout-list-start-btn">
                        Start Workout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          )
        ) : (
          <p>No workouts found</p>
        )}
      </div>
      <div className="schedule-buttons">
        <button
          className="schedule-btn"
          onClick={handleAddWorkout}
        >
          Add Workouts
        </button>
        <button
          className="schedule-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
