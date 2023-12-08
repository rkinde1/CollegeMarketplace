import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Chat from "./chat";
import './message.css';

const socket = io.connect("http://localhost:3001");

const Message = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [person, setPerson] = useState({
    // Assuming you have a 'person' object with user information
    firstName: "DefaultFirstName",
    // Add other properties as needed
  });

  const joinRoom = () => {
    if (room !== "") {
      if (username === "") {
        // Set the username to the first name from person.firstName
        setUsername(person.firstName);
      }

      // Emit join_room event and request chat history
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    // Request the list of existing rooms when the component mounts
    socket.emit("get_rooms");

    // Listen for the response from the server with the existing rooms
    socket.on("rooms_list", (rooms) => {
      setRoomList(rooms);
    });

    // Listen for the "room_joined" event when a user joins a new room
    socket.on("room_joined", (joinedRoom) => {
      setRoomList((prevRoomList) => [...prevRoomList, joinedRoom]);
    });

    // Cleanup event listeners on component unmount
    return () => {
      socket.off("rooms_list");
      socket.off("room_joined");
    };
  }, []);

  return (
    <div>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          {username === "" && (
            <input
              type="text"
              placeholder="name here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          )}
          <input
            type="text"
            placeholder="item ID here"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Message Seller</button>

          {/* Drop-down menu */}
          <div>
            <label>Select a Room:</label>
            <select onChange={(event) => setRoom(event.target.value)}>
              {roomList.map((roomItem) => (
                <option key={roomItem} value={roomItem}>
                  {roomItem}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Message;