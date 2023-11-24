import React, {useState} from "react"
import axios from 'axios'
import {useParams } from "react-router-dom";



function CreateComment () {
    const [commentDescription, setCommentDescription] = useState('');
    const posterEmail = localStorage.getItem('email');
    const [rating, setRating] = useState('');
    const {userFor} = useParams()

    const handleCreateComment = (e) => {
        e.preventDefault();
        axios.post(`/api/comments/create/${userFor}`,{commentDescription}, {posterEmail}, {rating})
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
        // fetch('/api/comment/create/:userFor', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ commentDescription, posterEmail, userFor, rating }),
        // })
        // .then((res) => {
        //     if (res.status === 200) {
        //         alert('Success');
        //         window.location.reload();
        //         console.log('Success');
        //         return res.json();
        //     } else if (res.status === 400) {
        //         alert('Comment already exists');
        //         console.log('Comment already exists');
        //     }
        //     else {
        //         alert('Failed');
        //         alert(res.status);
        //         console.log('Failed');
        //     }
        // })

    }

    return (
        <div>
            <h1>Create Comment For </h1>
            <form onSubmit={handleCreateComment} method="POST">
                <input type="text" placeholder="Description" id="description" onChange={(e) => setCommentDescription(e.target.value)} value={commentDescription}/>
                <input type="number" placeholder="Rating" id="rating" onChange={(e) => setRating(e.target.value)} value={rating}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default CreateComment;
