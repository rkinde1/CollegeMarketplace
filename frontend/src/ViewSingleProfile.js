import React, {useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom"
import axios from 'axios'

function Profile () {
    const {email} = useParams()
    const [comments, setComments] = useState([]);
    const [person, setPerson] = useState([]);
    const forUser = email;

    useEffect(() => {
        axios.post(`/api/profile/`, {email})
        .then(res => {
            console.log("Set person");
          setPerson(res.data);
        })
        .catch(err => console.log(err))
    })


    
    //authorization token
    const token = localStorage.getItem("token");       

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
            <div>
                <button onClick={handleComments}method="POST">View Comments</button>
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