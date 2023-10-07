import React from "react";
import './App.css';
import ToDo from './components/ToDo'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import SingleTask from "./components/Task/SingleTask";
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/task/:id" element={<SingleTask />} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
