import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Weather";
import { Countries } from "./pages/Countries";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/countries" />} />
      <Route path="/weather/:country" element={<Home />} />
      <Route path="/countries" element={<Countries />} />
    </Routes>
  );
}

export default App;
