import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect("https://gi-chat-server.vercel.app");


function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  
  return (
    <div className='App flex justify-center m-10'>
      { !showChat ? (
      <div className="card w-96 bg-base-100 shadow-xl ">
        <figure><img src="" /></figure>
        <div className="card-body">
          <h2 className="card-title">G-CHAT</h2>
          <p>My first chatting app!! </p>
          <input type="text" placeholder="Your name" className="input input-bordered input-info w-full max-w-xs" onChange={(event) => {
              setUsername(event.target.value);
            }}/>
          <input type="text" placeholder="Room ID" className="input input-bordered input-info w-full max-w-xs" onChange={(event) => {
              setRoom(event.target.value);
            }}/>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral" onClick={joinRoom}>Chat Now!</button>
          </div>
        </div>
      </div>
  ) : (
    <Chat socket={socket} username={username} room={room} />
  )}
</div>
); 
}

export default App;
