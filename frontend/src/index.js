import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Adopt from "./Adopt/Adopt";
import Moredetails from './Adopt/moreDetails';
import Chat from "./Chat/chat";
import Landing from "./LandingPage/Landing";
import Login from "./Login";
import Register from "./Register";
import AddPet from "./addPet/addPet";
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/ui" element={<Landing/>}></Route>
      <Route path="/adopt" element={<Adopt/>}></Route>
      <Route path="/partner" element={<AddPet/>}></Route>
      <Route path="/partner/:id" element={<AddPet/>}></Route>
      <Route path="/adopt/pet-details/:id" element={<Moredetails/>}></Route>
      <Route path="/chat/:id/:id" element={<Chat/>}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
