import React, {useState} from "react"
import axios from 'axios'
import {useParams } from "react-router-dom";



function CreateComment () {
    const [commentDescription, setCommentDescription] = useState('');
    const posterEmail = localStorage.getItem('email');
    const [newRating, setNewRating] = useState('');
    const {userFor} = useParams()

    const handleCreateComment = (e) => {
        if(newRating<1 || newRating > 5){
            alert("Rating must be between 1 and 5");
            return;
        }else if(!commentDescription){
            alert("Must fill out description");
            return;
        }
        e.preventDefault();
        fetch('/api/comments/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({commentDescription, posterEmail, newRating, userFor}),
        })
        .then(res => {
            if (res.status === 200) {
                alert('Success');
                window.location.reload();
                console.log('Success');
                return res.json();
            } else if (res.status === 400) {
                alert('Comment already exists');
                console.log('Comment already exists');
            }
            else {
                alert('Failed');
                alert(res.status);
                console.log('Failed');
            }
        })
        .catch(err => console.log(err))

    }

    return (
        <div>
            <h1>Create Comment For </h1>
            <form onSubmit={handleCreateComment} method="POST">
                <input type="text" placeholder="Description" id="description" onChange={(e) => setCommentDescription(e.target.value)} value={commentDescription}/>
                <input type="number" placeholder="Rating" id="rating" onChange={(e) => setNewRating(e.target.value)} value={newRating}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default CreateComment;
