import React, { useEffect, useState } from 'react';
import './message.css';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };

    // Listen for incoming messages
    socket.on("recieve_message", receiveMessageHandler);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.removeListener("recieve_message", receiveMessageHandler);
    };
  }, [socket]);

  useEffect(() => {
    // Request chat history when joining the room
    socket.emit("join_specific_room", { room, username });

    // Listen for chat history updates
    socket.on("chat_history", (history) => {
      setMessageList(history);
    });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.removeAllListeners("chat_history");
    };
  }, [socket, room, username]);

  // Listen for room changes and request chat history when the room changes
  useEffect(() => {
    const handleRoomChange = () => {
      // Request chat history when the room changes
      socket.emit("join_specific_room", { room, username });
    };

    // Listen for the room_change event
    socket.on("room_change", handleRoomChange);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.removeListener("room_change", handleRoomChange);
    };
  }, [socket, room, username]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
                key={index}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="hey"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;