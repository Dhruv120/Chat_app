import './App.css';
import React,{useState,useEffect} from 'react'
import { io } from "socket.io-client";
import {nanoid} from 'nanoid' 

const socket = io.connect("http://localhost:5000");
const userName =nanoid(5);
function App() {

  const [message, setmessage] = useState('');
  const [chat, setchat] = useState([]);


  const sendChat = (e) =>{
    e.preventDefault();
    socket.emit('chat',{message,userName});
    setmessage('');
  }

  useEffect(() => {
    socket.on('chat',(payload)=>{
      setchat([...chat,payload]);
    })
    
  })
  
  console.log(chat);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat Application using Socket.io</h1>
        <br /><br /><br />
        {
            chat.map((payload,index)=>{
              return (<p><span style={{backgroundColor:"pink"}} >{payload.userName}</span>: {payload.message} </p>)
            })
        }
        
      
      <form onSubmit={sendChat}>
        <div>
            <input type="text" name="chat" 
            value={message} 
            placeholder='Enter your Text'
            onChange={(e)=>{
              setmessage(e.target.value)
            }} />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
        
      </form>
      </header>
    </div>
  );
}

export default App;

