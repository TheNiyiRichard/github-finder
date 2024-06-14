import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import User from "./components/User";
import Header from "./components/Header";
import './css/index.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/user/:username" element={<User />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
