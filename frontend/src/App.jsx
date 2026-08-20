import 'bootstrap/dist/css/bootstrap.min.css';
import {  Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Errors from './pages/Errors';
import './App.css'
import Home from './pages/Home';
import NaNavbar from './components/NavBar';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import PrivateRouterUser from './routes/PrivateRouterUser';

function App() {

  return (
    <div className="app-shell">
      <NaNavbar />
      <main className="app-main">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRouterUser />}>
            <Route path="/profile" element={<Profile />} />
        </Route>
        
        <Route path="/Error" element={<Errors/>} />
      </Routes>
      </main>
      <Footer/>
    </div>
  )
  
}

export default App
