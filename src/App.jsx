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
import Dashboard from './pages/dashboard/Dashboard';
import Pendaftran from './pages/dashboard/Pendaftran';
import Dapur from './pages/dashboard/dapur/Dapur';
import PiketDapur from './pages/dashboard/dapur/PiketDapur';
import AddPiketDapur from './pages/dashboard/dapur/AddPiketDapur';
import MenuMakanan from './pages/dashboard/dapur/MenuMakanan';
import Tampildapur from './pages/divisi/Tampildapur';



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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pendaftaran" element={<Pendaftran />} />
          <Route path = "/divisi/dapur" element = {<Dapur />}/>
          <Route path = "/dapur/piketdapur" element = {<PiketDapur />}/>
          <Route path = "/dapur/piketdapur/add" element = {<AddPiketDapur />}/>
          <Route path = "/dapur/menumakanan" element = {<MenuMakanan />}/>
          <Route path = "/divisi/dapur`" element = {<Tampildapur />}/>

          <Route path = "/login" element = { <Login/> }/>
          <Route path = "*" element = { <ErrorPage/>} />
        </Routes>
      </BrowserRouter>
        </div>
    );
    }

export default App;