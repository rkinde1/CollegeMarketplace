import React, {useState} from "react"

function CreateComment () {
    const [commentDescription, setCommentDescription] = useState('');
    const posterEmail = localStorage.getItem('email');
    const [userFor, setUserFor] = useState('');

    const handleCreateComment = (e) => {
        e.preventDefault();
        fetch('/api/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ commentDescription, posterEmail, userFor }),
        })
        .then((res) => {
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

    }

    return (
        <div>
            <h1>Create Comment</h1>
            <form onSubmit={handleCreateComment} method="POST">
                <input type="text" placeholder="Description" id="description" onChange={(e) => setCommentDescription(e.target.value)} value={commentDescription}/>
                <input type="text" placeholder="UserFor" id="userFor" onChange={(e)=> setUserFor(e.target.value)} value={userFor}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default CreateComment;
