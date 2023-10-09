import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout () {
    const navigate = useNavigate();
    const [flag, setFlag] = React.useState(false);
    const logout = () => {
        alert("You have been logged out");
        localStorage.clear();
        navigate("/login");
        window.location.reload();
      }
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
};

export default Logout;