// App.js

import './App.css';
import About from './pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import ErrorPage from './pages/blogs/ErrorPage';
import Kepengurusan from './pages/Kepengurusan';
import Event from './pages/portal/Event';
import Login from './pages/auth/Login';
import Divisi from './pages/divisi/Divisi';
import Dashboard from './pages/dashboard/Dashboard';
import Pendaftran from './pages/dashboard/Pendaftran';
import Dapur from './pages/dashboard/dapur/Dapur';
import PiketDapur from './pages/dashboard/dapur/PiketDapur';
import AddPiketDapur from './pages/dashboard/dapur/AddPiketDapur';
import MenuMakanan from './pages/dashboard/dapur/MenuMakanan';
import Tampildapur from './pages/divisi/dapur/Tampildapur';
import Menu_makan from './pages/divisi/dapur/Menu_makan';
import Piket_Dapur from './pages/divisi/dapur/Piket_Dapur';
import Pendidikan from './pages/divisi/pendidikan/pendidikan';
import Kebersihan from './pages/divisi/kebersihan/Alat';
import Piket from './pages/divisi/kebersihan/Piket';
import ProtectedRoute from './ProtectedRoute';
import Keuangan from './pages/divisi/keuangan/bendahara';
import Sekretaris from './pages/divisi/sekretaris/Sekretaris';


const App = () => {
    return (
        <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Home />}/>
          <Route path = '/divisi' element = {<Divisi />}/>
          <Route path = "/event" element = {<Event />}/>
          <Route path = "/kepengurusan" element = { <Kepengurusan/>}/>
          <Route path = "/about" element = { <About/> }/>
          <Route path="/dashboard" element={ 
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/pendaftaran" element={<Pendaftran />} />
          <Route path = "/divisi/dapur" element = {<Dapur />}/>
          <Route path = "/dapur/piketdapur" element = {<PiketDapur />}/>
          <Route path = "/dapur/piketdapur/add" element = {<AddPiketDapur />}/>
          <Route path = "/dapur/menumakanan" element = {<MenuMakanan />}/>
          <Route path = "/divisi/dapur`" element = {<Tampildapur />}/>
          <Route path = "/divisi/dapur/menumakanan`" element = {<Menu_makan />}/>
          <Route path = "/divisi/dapur/piketdapur`" element = {<Piket_Dapur />}/>
          <Route path = "/divisi/pendidikan`" element = {<Pendidikan />}/>
          <Route path = "/divisi/kebersihan`" element = {<Kebersihan />}/>
          <Route path = "/divisi/kebersihan/Piket`" element = {<Piket />}/>
          <Route path = "/divisi/keuangan`" element = {<Keuangan />}/>
          <Route path = "/divisi/sekretaris`" element = {<Sekretaris />}/>


          <Route path = "/login" element = { <Login/> }/>
          <Route path = "*" element = { <ErrorPage/>} />
        </Routes>
      </BrowserRouter>
        </div>
    );
    }

export default App;