import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddEHR from "./pages/AddEHR";
import UpdateEHR from "./pages/UpdateEHR";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to="/home" />} />

      <Route
        path={"/home"}
        element={
          <div>
            <Home />
          </div>
        }
      />

      <Route
        path={"/add-ehr"}
        element={
          <div>
            <AddEHR />
          </div>
        }
      />

      <Route
        path={"/update-ehr"}
        element={
          <div>
            <UpdateEHR />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
