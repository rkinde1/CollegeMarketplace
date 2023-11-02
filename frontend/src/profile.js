import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Popup from "reactjs-popup";
import { Button } from 'react-bootstrap';
import UpdateProfile from "./UpdateProfile"


function Profile () {
    const firstName =localStorage.getItem('firstName');
    const icon = localStorage.getItem('defaultImage');
    const lastName = localStorage.getItem('lastName');
    const bio = localStorage.getItem('bio');
    const gradYear = localStorage.getItem('gradYear');
    const email = localStorage.getItem('email');
    const [comments, setComments] = useState([]);
    const [person, setPerson] = useState([]);

    

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
    

    // const handleComments = (e) => {
    //     fetch('/api/comments/view', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then((res) => {
    //         if (res.status === 200) {
    //             console.log('Success');
    //             return res.json();
    //         } else {
    //             console.log('Failed');
    //         }
    //     })
    //     .then((data) => {
    //         // alert(JSON.stringify(data));
    //         setComments(data);
    //     })
    // }
   
   


    const divStyle = {
        backgroundImage: `url('${icon}')`,
        backgroundSize: 'cover',
        height: '480px',
        paddingTop: '80px',
      };
    

    const imgStyle = {
        height: '150px',
    }
    return(
        
        <div>
            <h1>{firstName}</h1>
            {/* switch to users name and add rating */}
            <div style={divStyle}>
                <img src={icon} style={imgStyle} alt="Profile Picture Here" />
            </div>
            <Link to= '/profile-update' className='btn btn-primary'>Update Profile</Link>

        </div>
                
             /*<button onClick={handleComments}>View Comments</button>
            <div className="comment-list">
            {comments.map((comment) => (
                <div className="comment" key={comment._id}>
                    <h2>{comment.commentName}</h2>
                    <p>{comment.commentTitle}</p>
                    <p>{comment.commentDescription}</p>
                    <p>{comment.commentRating}</p>
                    <p className="userFont">{comment.date}</p>
                </div>   
                ))}
            </div> */
    )
}

export default Profile;