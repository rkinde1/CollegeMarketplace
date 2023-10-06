import logo from './logo.svg';
import './App.css';
import Signup from './Signup';
import Login from './login';

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
