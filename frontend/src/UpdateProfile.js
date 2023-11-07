import React, {useEffect, useState} from "react"
import axios from 'axios';


function UpdateProfile (){
    const email = localStorage.getItem('email');
    const [userImage, setUserImage] = useState("");
    const[bio, setBio] = useState('');

    const handleImageSubmit = async (e) => {
        e.preventDefault();

        fetch('/api/profile/uploadIcon',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userImage, email}),
        })
        .then((res)=>{
            if(res.status===200){
                console.log('success');
                return res.json();
            }else{
                console.log("failed");
            }
        })
    };
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setUserImage(reader.result);
        }

    }

    const handleBioSubmit = (e) => {
        fetch('/api/profile/uploadBio',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, bio}),
        })
        .then((res)=>{
            if(res.status===200){
                console.log('success');
                return res.json();
            }else{
                console.log("failed");
            }
        })
    };   


    return(
        <div>
            <h1>Change Profile</h1>
            <br></br>
            <form onSubmit={handleImageSubmit}>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form4Example2">Profile Image:</label>
                    <input  onChange={handleImage} type="file" id="formupload" name="image" className="form-control" />
                    <button type="submit">Update</button>
                </div>
            </form>
            <br></br>
            <form onSubmit={handleBioSubmit} method="POST"> 
                <label htmlFor="bio">Bio: </label>
                <input type="text" id="bio" onChange={(e) => setBio(e.target.value)} value={bio} />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateProfile;