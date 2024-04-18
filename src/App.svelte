<script>
  let msgs = []
      
  const ws = new WebSocket( 'ws://127.0.0.1:3000' )

  let ctr = 0;
  let color;



  // when connection is established...
  ws.onopen = () => {
    ws.send( 'a new client has connected.' )

    ws.onmessage = async msg => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
      const message = await msg.data.text()
      ctr++
      color = 'red'
      msgs = msgs.concat([ 'them: ' + message + ", message counter: "+ ctr])
    }
  }

  const send = function() {
    const txt = document.querySelector('input').value
    ws.send( txt )
    ctr++
    color = 'blue'
    msgs = msgs.concat([ 'me: ' + txt + ", message counter: "+ ctr])
  }
</script>

<input type='text' on:change={send} />

{#each msgs as msg }
  <h3 style= "color: {color}">{msg}</h3>
{/each}