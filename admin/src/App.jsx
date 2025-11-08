import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { AuthProvider } from "./Components/Context/AuthContext";
import "./Components/styles/variables.css";
import "./Components/styles/global.css";
import ResponderList from "./Components/ResponderList/ResponderList";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ResponderList />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
