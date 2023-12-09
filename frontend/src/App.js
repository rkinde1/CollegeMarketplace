import logo from './logo.svg';
import './App.css';
import Home from './homepage';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './Signup';
import Login from './login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Navbar, NavLink, Nav, Container} from 'react-bootstrap';
import Logout from './logout';
import Marketplace from './marketplace';
import Profile from './profile';
import UpdateProfile from './UpdateProfile';
import OTPInput from './OTPInput';
import PrivateRoutes from './privateRoutes';
import ViewSingleItem from './viewSingleItem';
import Progress from './progress';
import ChatBox2 from './ChatBox2';
import MyRequests from './myRequests';
import MyItems from './myItems';
import Message from './message';
import CreateComment from './createComment';
import ViewSingleProfile from './ViewSingleProfile';

function App() {
  const PrivateRoutes = () => {
    if (localStorage.getItem("authorized") === "true") {
      return (
        <Nav>
          <NavLink href="/market">Marketplace</NavLink>
          <NavLink href="/profile">Profile</NavLink>
          <NavLink href="/message">Message</NavLink>
          <NavLink href="/myRequests">My Requests</NavLink>
          <NavLink href="/myItems">My Item Requests</NavLink>
          <ChatBox2/>
          <Logout/>
        </Nav>
      )
    }
    else {
      return (
        <Nav>
          <NavLink href="/signup">Register</NavLink>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/forgot-password">Forgot Password?</NavLink>
          <NavLink href="/verify">Verify</NavLink>
        </Nav>
      )
    }
  }

  const PrivateRoutes2 = () => {
    if (localStorage.getItem("authorized") === "true") {
      return (
      <Route>
        <Route path="/market" element={<Marketplace />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/item/:id" element={<ViewSingleItem/>}></Route>
        <Route path="/myRequests" element={<MyRequests />}></Route>
        <Route path="/myItems" element={<MyItems />}></Route>
        <Route path="/createComment/:userFor" element={<CreateComment />}></Route>
      </Route>
      )
    } else {
      <Navigate to="/login"/>
    }
  }

  return (
    <BrowserRouter forceRefresh={true}>
      <Navbar>
        <Navbar.Brand style={{paddingLeft: "10px"}} href="/">Home</Navbar.Brand>
        <Nav>
          {PrivateRoutes()}
        </Nav>
      </Navbar>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/profile/:email" element={<ViewSingleProfile/>}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path='/profile-update' element={<UpdateProfile/>}></Route>
            <Route path="/message" element={<Message />}></Route>
            <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
            <Route path="/verify" element={<OTPInput />}></Route>
            {PrivateRoutes2()}
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  )
}

export default App;