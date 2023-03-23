import "./App.css";
import Home from "./components/Home/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import ChatBlock from "./components/Chat/ChatBlock";
import MySchedule from "./components/MySchedule/MySchedule";
const expertises = ["Computer Vision", "Machine Learning", "Web Development"];
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile expertises={expertises} />} />
        <Route path="/chat" element={<ChatBlock />} />
        <Route path="/myschedule" element={<MySchedule />} />
      </Routes>
    </div>
  );
};
export default App;
