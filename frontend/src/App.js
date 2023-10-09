import logo from './logo.svg';
import './App.css';
//import Home from './Home';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './Signup';
import Login from './login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Navbar, NavLink, Nav, Container} from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Navbar>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav>
          <NavLink href="/register">Register</NavLink>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/forgot-password">Forgot Password</NavLink>
          <NavLink href="/reset_password">Reset Password</NavLink>
        </Nav>
      </Navbar>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route path="/" element={<Signup />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset_password" element={<ResetPassword />}></Route> 
          </Routes>

        </header>
      </div>
    </BrowserRouter>
  )
}

export default App;
