<script>
  let msgs = []
  let TL = ["grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey"];

  const ws = new WebSocket( 'ws://127.0.0.1:3000' )

  // when connection is established...
  ws.onopen = () => {
    ws.send( 'a new client has connected.' )

    ws.onmessage = async msg => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
      const message = await msg.data.text()
      msgs = msgs.concat([ 'them: ' + message ])
    }
  }

  const send = function() {
    const txt = document.querySelector('input').value
    ws.send( txt )
    msgs = msgs.concat([ 'me: ' + txt ])
  }

  function flipTL(i) {
      if (TL[i] === "grey") {
          TL[i] = "blue"
      } else {
          TL[i] = "grey"
      }
  }


</script>
<style>
    .row {
        display: flex;
    }

    div {
        min-height: 100px;
        min-width: 100px;
    }
</style>

<div>
    <input type='text' on:change={send} />
</div>

<div>
    <div class="row">
        <div on:click={() => flipTL(0)} style="background-color: {TL[0]}; margin: 6px"></div>
        <div on:click={() => flipTL(1)} style="background-color: {TL[1]}; margin: 6px"></div>
        <div on:click={() => flipTL(2)} style="background-color: {TL[2]}; margin: 6px"></div>
    </div>
    <div class="row">
        <div on:click={() => flipTL(3)} style="background-color: {TL[3]}; margin: 6px"></div>
        <div on:click={() => flipTL(4)} style="background-color: {TL[4]}; margin: 6px"></div>
        <div on:click={() => flipTL(5)} style="background-color: {TL[5]}; margin: 6px"></div>
    </div>
    <div class="row">
        <div on:click={() => flipTL(6)} style="background-color: {TL[6]}; margin: 6px"></div>
        <div on:click={() => flipTL(7)} style="background-color: {TL[7]}; margin: 6px"></div>
        <div on:click={() => flipTL(8)} style="background-color: {TL[8]}; margin: 6px"></div>
    </div>
</div>


{#each msgs as msg }
  <h3>{msg}</h3>
{/each}