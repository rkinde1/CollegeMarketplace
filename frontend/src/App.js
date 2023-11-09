import logo from './logo.svg';
import './App.css';
import Home from './homepage';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './Signup';
import Login from './login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Navbar, NavLink, Nav, Container} from 'react-bootstrap';
import Logout from './logout';
import Marketplace from './marketplace';
import Progress from './progress';
import ChatBox2 from './ChatBox2';

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Navbar>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav>
          <NavLink href="/signup">Register</NavLink>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/forgot-password">Forgot Password</NavLink>
          <NavLink href="/reset_password">Reset Password</NavLink>
          {/*needs authorization feature to be implemented*/}
          <NavLink href="/market">Marketplace</NavLink>
          <NavLink href="/progress">Progress</NavLink>
          <NavLink href="/ChatBox2">ChatBox</NavLink>
        </Nav>
        <Logout/>
      </Navbar>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset_password" element={<ResetPassword />}></Route>
            {/*needs authorization feature to be implemented*/} 
            <Route path="/market" element={<Marketplace />}></Route>
            <Route path="/reset_password" element={<ResetPassword />}></Route>
            <Route path="/progress" element={<Progress />}></Route> 
            <Route path="/ChatBox2" element={<ChatBox2 />}></Route>
          </Routes>

        </header>
      </div>
    </BrowserRouter>
  )
}

export default App;
