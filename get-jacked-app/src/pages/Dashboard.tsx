import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateMovement } from "../context/CreateMovements";
import { CreateWorkout } from "../context/CreateWorkout";
import { API } from "../api";

// const apiKey = import.meta.env.VITE_API_KEY;

export const Dashboard = () => {
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(
    null
  );

  interface Movement {
    id: string;
    workoutId: string;
    movement: string;
    setsPlanned: number;
  }

  const [movementsList, setMovementsList] = useState<Movement[]>([]);
  const navigate = useNavigate();

  const workoutEdit = useContext(CreateMovement);
  if (!workoutEdit) {
    throw new Error("workoutEdit is null");
  }

  const { setEditWorkoutID } = workoutEdit;

  const workoutNow = useContext(CreateWorkout);
  if (!workoutNow) {
    throw new Error("workoutNow is null");
  }

  const { setTodaysWorkout } = workoutNow;

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

  const handleStartWorkout = (workout: string) => {
    setTodaysWorkout(workout);
    navigate("/todays-workout");
  };

  const getWorkouts = () => {
    return fetch(`${API}/workouts`)
      .then((res) => res.json())
      .catch((err: Error) => {
        throw new Error(`HTTP request getWorkouts failed ${err.message}`);
      });
  };

  const verifyUser = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).id : null;
  };

  // const sortDays = (days: []) => {
  //   const order = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  //   return days.slice().sort((a, b) => order.indexOf(a) - order.indexOf(b))
  // }

  interface Workout {
    id: string;
    workout: string;
    day: string;
    userID: string;
  }

  const sortWorkoutsByDay = useCallback((workouts: Workout[]) => {
    const daysOrder = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return workouts.slice().sort((a, b) => {
      return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
    });
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workouts = await getWorkouts();
        const userID = verifyUser();
        const userWorkouts = workouts.filter((workout: { userID: string }) => {
          return workout.userID === userID;
        });
        const sortedWorkouts = sortWorkoutsByDay(userWorkouts);
        setWorkoutList(sortedWorkouts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWorkouts();
  }, [sortWorkoutsByDay]);

  const toggleExpand = (workoutId: string) => {
    setExpandedWorkoutId((prev) => (prev === workoutId ? null : workoutId));
  };

  const getMovements = () => {
    return fetch(`${API}/movements`)
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
                          movement.workoutId === workout.id
                      )
                      .map((movement: Movement) => (
                        <p key={movement.id}>
                          {movement.movement} - {movement.setsPlanned} sets
                        </p>
                      ))}
                    <div className="workout-list-btn-box">
                      <button
                        onClick={() => handleEdit(workout.id)}
                        className="workout-list-edit-btn"
                      >
                        Edit Workout
                      </button>
                      <button
                        onClick={() => handleStartWorkout(workout.id)}
                        className="workout-list-start-btn"
                      >
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
