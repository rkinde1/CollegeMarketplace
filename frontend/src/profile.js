import React, {sueEffect, useState, useContext} from 'react'
import {UserContext} from '../..App'
import {useParams} from 'react-router-dom'

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)

            setProfile(result)
        })
    },[])

    return(
        <div>
            <h1>User Profile</h1><br/>
        </div>
    )
}

export default Profile