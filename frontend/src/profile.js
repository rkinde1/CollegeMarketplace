import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Popup from "reactjs-popup";
import { Button } from 'react-bootstrap';
import UpdateProfile from "./UpdateProfile"
import MyItems from "./myRequests"
import "./comment.css";



function Profile () {
    const email = localStorage.getItem('email');
    const [comments, setComments] = useState([]);
    const [person, setPerson] = useState([]);
    const forUser = email;


    //authorization token
    const token = localStorage.getItem("token");   
    useEffect(() => {
        fetch('/api/profile/profile',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        .then((res)=>{
            if(res.status===200){
                console.log('success');
                return res.json();
            }else{
                console.log("failed");
            }
        })
        .then((data) => {
            // alert(JSON.stringify(data));
            setPerson(data);
        });
    }, [email]);
    

        const handleComments = async (e) => {
        await fetch('/api/comments/view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userFor: forUser}),
        })
        .then((res) => {
            if (res.status === 200) {
                console.log('Success');
                return res.json();
            } else {
                console.log('Failed');
            }
        })
        .then((data) => {
            alert(JSON.stringify(data));
            setComments(data);
        })
    }
   

    const divStyle = {
        height: '480px',
        paddingTop: '80px',
      };
    

    const imgStyle = {
        height: '150px',
    }

    return(
        <div>
            <h1> {person.firstName} {person.lastName} {person.gradYear }</h1>
            <h1>Rating: {person.rating}</h1>
            <div style={divStyle}>
                <img src={person.defaultImage} style={imgStyle} alt="Profile Picture Here" />
            </div>
            <div>
                <h1>{person.bio}</h1>
            </div>
            <Link to= '/profile-update' className='btn btn-primary'>Update Profile</Link>
            <div>
                <button onClick={handleComments} method="POST">View Comments</button>
                <div className="comment-list">
                
                {comments.map((comment) => (
                    <div className="comment" key={comment._id}>
                        <h2>{comment.commentDescription}</h2>
                        <h2>{comment.rating}</h2>
                        <p1>{comment.date}</p1>
                        <p className="userFont">{comment.posterEmail}</p>
                    </div>   
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile;