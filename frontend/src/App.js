import logo from './logo.svg';
import './App.css';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <div className="App">
    <header className="App-header">
        {/* Add the Signup component */}
        <Signup />
    </header>
    </div>
  );
}

export default App;
