<script>
  let colors = [];

  const ws = new WebSocket("ws://127.0.0.1:3000");

  // when connection is established...
  ws.onopen = () => {
    ws.send("a new client has connected.");

    ws.onmessage = async (msg) => {
      // add message to end of msgs array,
      // re-assign to trigger UI update
      const message = await msg.data.text();
      console.log(message);
      document.body.style.backgroundColor = message;
      colors = colors.concat(["their color send >:( " + message]);
    };
  };

  const changeColor = function () {
    //Creating function to change color of client backgrounds
    const randomColor = Math.floor(Math.random() * 16777215).toString(16); //Random color generation algorithm
    const clrString = "#" + randomColor; //assign a hex color
    ws.send(clrString); //send color through the socket
    colors = colors.concat(["my color send :) " + clrString]);
  };

</script>

<!-- <input type='text' on:change={send} /> -->
<button id="changeColor " on:click={changeColor} />
<!-- Create button to change the window color for others -->

{#each colors as color}
  <h3>{color}</h3>
{/each}
