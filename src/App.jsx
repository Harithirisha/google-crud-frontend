import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import AddStudent from "./addReview";
import UpdateReview from "./updateReview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addReview" element={<AddStudent/>}/>
        <Route path="/updateReview" element={<UpdateReview/>}/>
        </Routes>
    </Router>
  );
}

export default App;
