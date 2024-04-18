import { useState } from 'react'
import './App.css'
import Page from './Page'

function App(props) {
  const [msgs, setMsgs] = useState([])
        
  // when connection is established...
  props.ws.onopen = () => {
    props.ws.send( 'a new client has connected.' )
  
    props.ws.onmessage = async msg => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
      const message = await msg.data.text()
      setMsgs(msgs.concat([ 'them: ' + message ]))
    }
  }
  
  const send = function() {
    const txt = document.getElementById("write").value
    props.ws.send( txt )
    setMsgs(msgs.concat([ 'me: ' + txt ]))
  }
  
  return (
    <Page msgs={msgs} send={send}/>
  )
}

export default App
