// App.js
import { Component } from 'react';
import './App.css';
import About from './pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import ErrorPage from './pages/blogs/ErrorPage';
import Kepengurusan from './pages/Kepengurusan';
import LaporanDevisi from './pages/portal/LaporanDevisi';
import Login from './pages/auth/Login';
import Divisi from './pages/divisi/Divisi';



const App = () => {
    return (
        <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Home />}/>
          <Route path = '/divisi' element = {<Divisi />}/>
          <Route path = "/laporandevisi" element = {<LaporanDevisi />}/>
          <Route path = "/kepengurusan" element = { <Kepengurusan/>}/>
          <Route path = "/about" element = { <About/> }/>

          <Route path = "/login" element = { <Login/> }/>
          <Route path = "*" element = { <ErrorPage/>} />
        </Routes>
      </BrowserRouter>
        </div>
    );
    }

export default App;