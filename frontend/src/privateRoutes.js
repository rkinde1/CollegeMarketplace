import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {

    //checks to see if the user has an account or not
    let auth = {'token':false}

    //does this user have the authority to open this page?
    if (localStorage.getItem("authorized") != null) {
        auth = true;
    }   

    //returns the user back to the login page to have them signup
    return(
        auth.token ? <Navigate to="/market"/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes













