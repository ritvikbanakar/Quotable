import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./pages/HomePage/Home";
import Upload from "./pages/UploadPage/Upload";
import Register from "./pages/RegisterPage/Register";
import Login from "./pages/LoginPage/Login";
import app from "./firebase";

const App = () => {
  console.log(app)
  return (
    <>
      {app && 
        <React.StrictMode>
          <Router>
            <Header />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </Router>
        </React.StrictMode>
      }
    </>
  );
}

export default App;
