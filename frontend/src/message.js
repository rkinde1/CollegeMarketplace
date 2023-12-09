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
  const [person, setPerson] = useState([]);
  const email = localStorage.getItem('email');

  const joinRoom = () => {
    if (room !== "") {
      if (username === "") {
        setUsername(person.firstName);
      }

      // Emit join_specific_room event and request chat history for the selected room
      socket.emit("join_specific_room", { room, username });
      setShowChat(true);
    }
  };

  useEffect(() => {
    // Request the list of existing rooms when the component mounts
    socket.emit("get_rooms");

    // Listen for the response from the server with the existing rooms
    socket.on("rooms_list", (rooms) => {
      setRoomList(rooms);

      // Set the initial value of room to the first item in the array
      if (rooms.length > 0) {
        setRoom(rooms[0]);
      }
    });

    // Listen for the "room_joined" event when a user joins a new room
    socket.on("room_joined", (joinedRoom) => {
      setRoomList((prevRoomList) => [...prevRoomList, joinedRoom]);
    });

    // Listen for the chat_history event and update chat history
    socket.on("chat_history", (chatHistory) => {
      // Update your chat history state in the Chat component
      // For example, you might have a function to update chat history in the Chat component
      // updateChatHistory(chatHistory);
    });

    // Cleanup event listeners on component unmount
    return () => {
      socket.off("rooms_list");
      socket.off("room_joined");
      socket.off("chat_history");
    };
  }, []);

  useEffect(() => {
    fetch('/api/profile/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("failed");
        }
      })
      .then((data) => {
        setPerson(data);
      });
  }, [email]);

  return (
    <div>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
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