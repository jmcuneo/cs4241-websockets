import { useState, useEffect } from 'react'
import './App.css'
import Page from './Page'

function App(props) {
  const [msgs, setMsgs] = useState([])
  const [bg, setBG] = useState('#FFFFFF')
  const rgx = /#[a-zA-Z1-9]{6}/gm

  useEffect(() => {
    document.body.style.backgroundColor = bg;
  })

  // when connection is established...
  useEffect(() => {
    props.ws.onopen = () => {
      props.ws.send( 'a new client has connected.' )  
      
      props.ws.onmessage = async msg => {
        // add message to end of msgs array,
        // re-assign to trigger UI update
        const message = await msg.data.text()
        const search = rgx.exec(message)
        if(search !== null)
          setBG(search[0])
        console.log(msgs)
        const new_msgs = msgs.concat([ 'them: ' + message ])
        console.log(new_msgs)
        setMsgs(new_msgs)
      }
    }
  }, [])
  
  const send = function() {
    const txt = document.getElementById("write").value
    props.ws.send( txt )
    const search = rgx.exec(txt)
    if(search !== null)
      setBG(search[0])
    const new_msgs = msgs.concat([ 'me: ' + txt ])
    console.log(new_msgs)
    setMsgs(new_msgs)
  }
  
  return (
    <Page msgs={msgs} send={send}/>
  )
}

export default App
