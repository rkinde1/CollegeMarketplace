import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "./chat";
import "./message.css";

const socket = io.connect("http://localhost:3001");

const Message = () => {
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [person, setPerson] = useState([]);
  const email = localStorage.getItem("email");

  const joinRoom = async () => {
    if (room !== "") {
      if (!person.firstName) {
        console.warn("Username not available. Please update your profile.");
        return;
      }

      if (!roomList.includes(room)) {
        // Create the room if it doesn't exist
        await socket.emit("create_room", room);
        setRoomList((prevRoomList) => [...prevRoomList, room]);
      }

      // Emit join_specific_room event and request chat history
      socket.emit("join_specific_room", { room, username: person.firstName });
      setShowChat(true);
    }
  };

  useEffect(() => {
    // Request the list of existing rooms when the component mounts
    socket.emit("get_rooms");

    // Listen for the response with the rooms list
    socket.on("rooms_list", (rooms) => {
      // Add an empty option at the beginning
      rooms.unshift("");
      setRoomList(rooms);
    });

    // Listen for the "room_created" event when a new room is created
    socket.on("room_created", (createdRoom) => {
      setRoomList((prevRoomList) => [...prevRoomList, createdRoom]);
    });

    // Cleanup event listeners on component unmount
    return () => {
      socket.off("rooms_list");
      socket.off("room_created");
    };
  }, []);

  useEffect(() => {
    fetch("/api/profile/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          <h3>Join or Create a chat</h3>
          <input
            type="text"
            placeholder="Enter the item ID to join or create a chat"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join/Create Room</button>

          {/* Drop-down menu */}
          <div>
            <label>Select a Room:</label>
            <select
              value={room}
              onChange={(event) => setRoom(event.target.value)}
            >
              {roomList.map((roomItem) => (
                <option key={roomItem} value={roomItem}>
                  {roomItem}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={person.firstName} room={room} />
      )}
    </div>
  );
};

export default Message;