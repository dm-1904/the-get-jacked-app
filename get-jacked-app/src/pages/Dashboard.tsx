import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [workoutList, setWorkoutList] = useState([]);
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(
    null
  );
  const [movementsList, setMovementsList] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleEditWorkouts = () => {
    navigate("/add-workout");
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
                className="workout-list-item"
                key={workout.id}
              >
                <p>
                  {workout.day} - {workout.workout}
                </p>
                {expandedWorkoutId === workout.id && (
                  <div className="movements-list">
                    {movementsList
                      .filter((movement) => movement.workoutID === workout.id)
                      .map((movement) => (
                        <p key={movement.id}>
                          {movement.movement} - {movement.sets} sets
                        </p>
                      ))}
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
          onClick={handleEditWorkouts}
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
