import React, {useEffect, useState} from "react"
import { useNavigate, Link} from "react-router-dom"
import Popup from "reactjs-popup";
import { Button } from 'react-bootstrap';
import history from './history';

function Profile () {

    //const userImg = localStorage.getItem('icon');
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const firstName =localStorage.getItem('firstName');
    const imageLocation = localStorage.getItem('defaultImage');

    async function uploadImage(file) { // file from <input type="file"> 
        // const data = new FormData();
        // data.append("file", file);
        // data.append("upload_preset", CollegeMarketPlace);
      
        // const res = await fetch(
        //   `https://api.cloudinary.com/v1_1/${'34ecccb5bf9c0877db2edf49666747'}/image/upload`,
        //   {
        //     method: "POST",
        //     body: data,
        //   }
        // );
        // const img = await res.json();
        // // Post `img.secure_url` to your server and save to MongoDB
      }

      function send(){
        navigate('/UploadImage');
      }
    const divStyle = {
        backgroundImage: `url('${imageLocation}')`,
        backgroundSize: 'cover',
        height: '480px',
        paddingTop: '80px',
      };
    const imgStyle = {
        height: '150px',
    }
    return(
        
        <div>
            {/* switch to users name */}
            <h1> {firstName} </h1><br/>
            <div style={divStyle}>
                <img src={imageLocation} style={imgStyle} alt="Description" />
            </div>
                <form>
                    <Link to = "/UploadImage">Upload Profile Picture</Link>
                </form>
        </div>
    )
}

export default Profile;

// const handleImageChange = (e) =>{

//     fetch('/api/signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ image }),
//     })
//     .then((res) => {
//         if (res.status === 200) {
//             alert('Success');
//             console.log('Success');
//             return res.json();
//         }
//         else {
//             alert('Failed');
//             alert(res.status);
//             console.log('Failed');
//         }
//     })
// }