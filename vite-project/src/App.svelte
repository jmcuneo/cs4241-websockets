
<script>
  let msgs = []
  let counter = 1;

  const ws = new WebSocket( 'ws://127.0.0.1:3000' )

  // when connection is established...
  ws.onopen = () => {
    ws.send( ' has connected.' )

    ws.onmessage = async msg => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
      const time = new Date();
      const timeString = `${time.getHours()}:${time.getMinutes()}`;
      const message = await msg.data.text()
      msgs = msgs.concat([message + ` ${timeString}` ])
    }
  }

  const send = function() {
    const txt = ": " + document.querySelector('input').value
    const time = new Date();
    const timeString = `${time.getHours()}:${time.getMinutes()}`;
    ws.send( txt )
    msgs = msgs.concat([ `${timeString} ` + 'me' + txt])
  }
</script>


<main>
  <h1>Messaging Application</h1>
</main>

{#each msgs as msg }
  <h3>{msg}</h3>
{/each}

<input type='text' on:change={send} />

