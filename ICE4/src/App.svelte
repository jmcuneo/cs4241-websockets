<script>
  let msgs = []
      
  const ws = new WebSocket( 'ws://127.0.0.1:3000' )

  // when connection is established...
  ws.onopen = () => {
    ws.send( 'a new client has connected.' )
    //alert( 'a new user had connected!' )

    ws.onmessage = async msg => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
      const message = await msg.data.text()
      msgs = msgs.concat([{ text: 'them: ' + message, isMe: false}])
     
    }
  }

  const send = function() {
    const txt = document.querySelector('input').value
    ws.send( txt )
    msgs = msgs.concat([{text: 'me: ' + txt, isMe: true}])
    console.log( msgs)
  }
</script>

<style>

  .me {
    color: blue;
  }

  .them {
    color: red;
  }
</style>

<input type='text' on:change={send} />


{#each msgs as msg }
  <h3 class={msg.isMe ? 'me' : 'them'}>{msg.text}</h3>
{/each}