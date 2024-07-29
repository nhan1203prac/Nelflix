import { useContext } from "react";
import "./App.scss"
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import Watch from "./watch/Watch";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext/AuthContext";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/register" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        {user && (<>
        <Route path="/movies" element={<Home type="movies" />} />
        <Route path="/series" element={<Home type="series" />} />
        <Route path="/watch" element={<Watch/>} />
        </>)}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
