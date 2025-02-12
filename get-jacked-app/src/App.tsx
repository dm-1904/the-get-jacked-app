import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { RegisterPage } from "./pages/RegisterPage";
import { Dashboard } from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [dependency, setDependency] = useState(0);
  const isLoggedIn = false; // Replace with actual login state

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              setDependency={setDependency}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
