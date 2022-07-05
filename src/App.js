import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./pages/HomePage/Home";
import Upload from "./pages/UploadPage/Upload";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
