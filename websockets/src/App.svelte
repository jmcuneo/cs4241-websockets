<script>
  let msgs = []
  let username = "Me";
      
  const ws = new WebSocket( 'ws://127.0.0.1:3000' )

  // when connection is established...
  ws.onopen = () => {
    ws.send( 'a new client has connected.' )

    ws.onmessage = async msg => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
      const message = JSON.parse(await msg.data.text());
      msgs = msgs.concat([ message.name + ': ' + message.msg ])
    }
  }

  const send = function() {
    const txt = document.querySelector('#message').value
    ws.send(JSON.stringify({name: username, msg: txt}))
    msgs = msgs.concat([ username + ': ' + txt ])
  }

  const changeUserName = function() {
    username = document.querySelector('#user').value 
  }
</script>

<input id="user" type="text" on:change={changeUserName} placeholder="enter your name"/>
<input id= "message" type='text' on:change={send} />

{#each msgs as msg }
  <h3>{msg}</h3>
{/each}