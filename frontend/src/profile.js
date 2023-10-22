import React, {useEffect, useState} from "react"
import { useNavigate, Link} from "react-router-dom"
import Popup from "reactjs-popup";
import { Button } from 'react-bootstrap';
import uploadImage from "./UploadImage"


function Profile () {
    //const [comments, setComments] = useState([]);

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

    //const userImg = localStorage.getItem('icon');
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const firstName =localStorage.getItem('firstName');
    const imageLocation = localStorage.getItem('defaultImage');

    const divStyle = {
        backgroundImage: `url('${imageLocation}')`,
        backgroundSize: 'cover',
        height: '480px',
        paddingTop: '80px',
      };

      const navigateToUploadImage = () => {
        // 👇️ navigate to /UploadImage
        navigate('/UploadImage');
      };
    

    const imgStyle = {
        height: '150px',
    }
    return(
        
        <div>
            {/* switch to users name and add rating */}
            <h1> {firstName}  </h1><br/>
            <div style={divStyle}>
                <img src={imageLocation} style={imgStyle} alt="Profile Picture Here" />
            </div>
            <button onClick={navigateToUploadImage}>Upload Profile Picture</button>
                
             {/*<button onClick={handleComments}>View Comments</button>
            <div className="comment-list">
            {comments.map((comment) => (
                <div className="comment" key={comment._id}>
                    <h2>{comment.commentName}</h2>
                    <p>{comment.commentTitle}</p>
                    <p>{comment.commentDescription}</p>
                    <p>{comment.commentDate}</p>
                    <p>{comment.commentRating}</p>
                    <p className="userFont">{comment.date}</p>
                </div>   
                ))}
            </div> */}
        </div>
    )
}

export default Profile;