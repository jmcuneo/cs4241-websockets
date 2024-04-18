<h2>Number Guesser and Chat App</h2>

<script>
      let msgs = []
      let guessResponse = ""
      const secret_number = 333
          
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
      
      ws.onmessage = function(event) {
        const message = event.data
        msgs = msgs.concat([ 'server: ' + message ])
      }

      const send = async function(e) {
        const txt = document.querySelector('input').value
      
        const guess = parseInt(txt)
        if(isNaN(guess)){
          ws.send( txt )
          msgs = msgs.concat([ 'me: ' + txt ])
        }else{
          const guessMsg = handleGuess(parseInt(txt))
          const guessLog = guess
          msgs = msgs.concat(['me: ' + guessLog],[ 'robot: ' +  guessMsg ])
        }
      }

      const handleGuess = function(txt){
        if(txt == secret_number){
          return "YOU GOT THE NUMBER"
        }else if (txt > secret_number){
          return "LOWER"
        }else{
          return "HIGHER"
        }
      }
</script>

<!-- <h2>{guessResponse}</h2> -->

<input type='text' on:change={send} />


{#each msgs.reverse() as msg }
  <h3>{msg}</h3>
{/each} 

<html lang="en">
  <head>
    <style>
      body { 
        margin:0; 
        background:black 
      } 
    </style>
  </head>
  <body>

    <canvas></canvas>
    
  </body>
</html>