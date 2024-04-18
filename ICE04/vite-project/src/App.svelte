<script>
  let msgs = []
      
  const ws = new WebSocket( 'ws://127.0.0.1:3000' )

  // when connection is established...
  ws.onopen = () => {

    const connectionTxt = 
    {
      username: "server",
      msg: 'a new client has connected.'
    }
    ws.send( JSON.stringify(connectionTxt) )

    ws.onmessage = async msg => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
        const message = await msg.data.text()

      msgs = msgs.concat([ message + ': ' + message])
    }
  }

  const getUsername = function() {
    let val = document.getElementById('username').value
    if (val == "") {
      val = "guest"
    }
    console.log(val)
    return val
  }

  const send = function() {
    let username = getUsername()
    const txt = 
    {
      username: username,
      msg: document.querySelector('input').value
    }

    ws.send( JSON.stringify(txt) )
    msgs = msgs.concat([ 'me: ' + txt.msg ])
  }
</script>


<input type='text' on:change={send} />

<input type='text' id="username" />

{#each msgs as msg }
  <h3>{msg}</h3>
{/each}