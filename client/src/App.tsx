import { SetStateAction, useEffect, useMemo, useState } from "react"
import {io} from "socket.io-client"


function App() {
  const socket = useMemo(() => io('http://localhost:3000'), [])
  const [msg, setMsg] = useState('')
  const [room, setRoom] = useState('')
  const [socketId, setsocketId] = useState<SetStateAction<string>>('')
  const [message, setMessages] = useState([])
  
  console.log(message)

  const handleSubmit = (e: any) => {
    e.preventDefault();

    socket.emit('message', {msg, room})

  }
  useEffect(() => {
    socket.on("connect", () => {
      setsocketId(socket.id);
      console.log("connected", socket.id);
    })
    
    socket.on('receive message', (data) => {
    console.log('received message:', data)
    setMessages((msgs) => [...msgs, data])
    return
    })
  })

  socket.on("welcome", (s) => {
    console.log(s)
  })
  return (
    <>
     <form onSubmit={(e) => {handleSubmit(e)}}>
      <label htmlFor="something">some randome message</label>
      <input type="text" placeholder="put some text here" onChange={(e) => {setMsg(e.target.value)}} ></input>

      <label htmlFor="something2">Room</label>
      <input type="text" onChange={(e) => setRoom(e.target.value)}></input>
      <h6>{socketId}</h6>
      <button type="submit">Submit this message</button>
     </form>
    </>
  )
}

export default App
