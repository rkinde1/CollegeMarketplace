import React, {useEffect, useState} from "react"
import { useNavigate, Link} from "react-router-dom"
import Popup from "reactjs-popup";

function Profile () {
    //const userImg = localStorage.getItem('icon');
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const handleImageChange = (e) =>{

        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image }),
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success');
                console.log('Success');
                return res.json();
            }
            else {
                alert('Failed');
                alert(res.status);
                console.log('Failed');
            }
        })
    }
    return(
        <div>
            {/* switch to users name */}
            <h1>User's Profile</h1><br/>
            <form onSubmit={handleImageChange} method="POST">
                <h1>Enter Profile Picture</h1>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} value = {image}/>
            </form>
        </div>
    )
}

export default Profile;