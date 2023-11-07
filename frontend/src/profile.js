import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Popup from "reactjs-popup";
import { Button } from 'react-bootstrap';
import UpdateProfile from "./UpdateProfile"


function Profile () {
    const email = localStorage.getItem('email');
    const [comments, setComments] = useState([]);
    const [person, setPerson] = useState([]);
    const forUser = email;

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
    

    const handleComments = (e) => {
        fetch('/api/comments/view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({forUser}),
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
            // alert(JSON.stringify(data));
            setComments(data);
        })
    }
   
   

    const divStyle = {
        backgroundImage: `url('${person.defaultImage}')`,
        backgroundSize: 'cover',
        height: '480px',
        paddingTop: '80px',
      };
    

    const imgStyle = {
        height: '150px',
    }

    return(
        
        <div>
            <h1>{person.firstName} {person.lastName} {person.gradYear }</h1>
            <div style={divStyle}>
                <img src={person.defaultImage.url} style={imgStyle} alt="Profile Picture Here" />
            </div>
            <div>
                {person.bio}
            </div>
            <Link to= '/profile-update' className='btn btn-primary'>Update Profile</Link>
            <div>
                <button onClick={handleComments}method="POST">View Comments</button>
                <div className="comment-list">
                {comments.map((comment) => (
                    <div className="comment" key={comment._id}>
                        <h2>{comment.commentDescription}</h2>
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