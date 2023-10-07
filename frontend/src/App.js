import logo from './logo.svg';
import './App.css';
//import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <header className="App-header">
          <Routes>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route path="/register" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset_password" element={<ResetPassword />}></Route> 
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <div className="App">
    <header className="App-header">
        {/* Add the Signup component */}
        <Signup />
        <Login />
    </header>
    </div>
  );
}

export default App;
