import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
// import ProfileCompletion from './pages/Profile'; // Adjust the path if needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
