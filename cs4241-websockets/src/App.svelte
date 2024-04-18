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
      flipFromOther(message)
    }
  }

  const send = function(i) {
    const txt = document.querySelector('input').value
    ws.send( i )
    msgs = msgs.concat([ 'me: ' + txt ])
  }

  function flip(i) {
      if (TL[i] === "grey") {
          TL[i] = "blue"
      } else {
          TL[i] = "grey"
      }
      ws.send( i )
  }

  function flipFromOther(i) {
      if (TL[i] === "grey") {
          TL[i] = "red"
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

<!--<div>-->
<!--    <input type='text' on:change={send} />-->
<!--</div>-->

<div>
    <div class="row">
        <div on:click={() => flip(0)} style="background-color: {TL[0]}; margin: 6px"></div>
        <div on:click={() => flip(1)} style="background-color: {TL[1]}; margin: 6px"></div>
        <div on:click={() => flip(2)} style="background-color: {TL[2]}; margin: 6px"></div>
    </div>
    <div class="row">
        <div on:click={() => flip(3)} style="background-color: {TL[3]}; margin: 6px"></div>
        <div on:click={() => flip(4)} style="background-color: {TL[4]}; margin: 6px"></div>
        <div on:click={() => flip(5)} style="background-color: {TL[5]}; margin: 6px"></div>
    </div>
    <div class="row">
        <div on:click={() => flip(6)} style="background-color: {TL[6]}; margin: 6px"></div>
        <div on:click={() => flip(7)} style="background-color: {TL[7]}; margin: 6px"></div>
        <div on:click={() => flip(8)} style="background-color: {TL[8]}; margin: 6px"></div>
    </div>
</div>


{#each msgs as msg }
  <h3>{msg}</h3>
{/each}