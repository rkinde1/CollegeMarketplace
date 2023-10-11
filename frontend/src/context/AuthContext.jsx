import {useEffect} from "react";
import {createContext, useCallback, useState} from "react";
import {baseUrl, postRequest} from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children}) =>{
    const [user,setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password: "",
    });

    const updateUser = useCallback((response)=>{
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response)
    },[])

    return(
        <AuthContext.Provider
            value={{
                updateUser
            }}
        ></AuthContext.Provider>
    );
};
    
