import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./components";
import "./App.css";
import MainRoutes from "./MainRoutes";

function App() {
  return (
    <>
      <Router>
        <MainRoutes />
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;