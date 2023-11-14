import React, {useState} from "react"
import { useNavigate, Link} from "react-router-dom"
import io from 'socket.io-client';
import Chat from "./chat";
import './message.css';

const socket = io.connect("http://localhost:3001")

const Message = () =>{
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    

    const joinRoom = () => {
        if (username !== "" && room !== ""){
            socket.emit("join_room", room)
            setShowChat(true);
        }
    };
    
    return(
    <div>
        {!showChat ? (
        <div className = "joinChatContainer">
        <h3>Join A Chat</h3>
        <input 
            type = "text" 
            placeholder = "name here"  
            onChange = {(event) => {
                setUsername(event.target.value);
            } }/>
        {/* Pass item ID here */}
        <input 
            type = "text" 
            placeholder = "item ID here"
            onChange = {(event) => {
                setRoom(event.target.value);
            } }/>
        <button onClick = {joinRoom}>Message Seller</button>
        </div>
        ) : (
        <Chat socket = {socket} username = {username} room = {room}/>
        )}
    </div>
    )
}

export default Message;