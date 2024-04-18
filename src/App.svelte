<script>
  let msgs = []

  const ws = new WebSocket( 'ws://127.0.0.1:3000' )

  // when connection is established...
  ws.onopen = () => {
    ws.send( 'A new client has connected.' )

    ws.onmessage = async msg => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
      const message = await msg.data.text()
      msgs = [message ].concat(msgs)
    }
  }

  const send = function() {
    const txt = document.getElementById('message')
    const name = document.getElementById("name")
    if (name.value === ""){
      alert("Please enter a username")
    }
    else{
      ws.send(name.value + ": " + txt.value)
      msgs = [ 'me: ' + txt.value ].concat(msgs)
      txt.value = ""
    }
  }
</script>

<input placeholder="Name" type="text" id="name"/> <br>
<input placeholder="Message" type='text' id="message" on:change={send} />


{#each msgs as msg }
  <h3>{msg}</h3>
{/each}