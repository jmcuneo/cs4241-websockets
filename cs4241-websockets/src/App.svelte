<script>
  let msgs = []
  let TL = ["", "", "", "", "", "", "", "", ""];

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
      if (TL[i] === "") {
          TL[i] = "O"
      } else {
          TL[i] = ""
      }
      ws.send( i )
  }

  function flipFromOther(i) {
      if (TL[i] === "") {
          TL[i] = "X"
      } else {
          TL[i] = ""
      }
  }



</script>
<style>
    .row {
        display: flex;
    }

    .cell {
      border: white 2px solid;
      font-size: 53px;
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
    {#each [0, 1, 2] as row}
        <div class="row">
            {#each [0, 1, 2] as col}
                {@const index = row * 3 + col}
                <div class="cell" on:click={() => flip(index)} style="margin: 6px">{TL[index]}</div>
            {/each}
        </div>
    {/each}
</div>


{#each msgs as msg }
  <h3>{msg}</h3>
{/each}