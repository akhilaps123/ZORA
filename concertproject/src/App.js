// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Home/>
//     // <BrowserRouter>
//     //   <Routes>
//     //      <Route path="/" element={<Login/>} />
//     //     <Route path="/signup" element={<Signup />} />
//     //     <Route path="/login" element={<Login />} />
//     //   </Routes>
//     // </BrowserRouter>
  );
// function App() {
//   return null; // Router handles everything
}

export default App;
