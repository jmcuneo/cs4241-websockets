<script>
  import { username } from "./username-store.js";
  let message = "";
  let msgs = [];
  const ws = new WebSocket("ws://localhost:3000");
  const colors = [
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
  ];
  let colorMap = new Map();

  // when connection is established...

  function getColorForUser(user) {
    if (!colorMap.has(user)) {
      colorMap.set(user, colors[colorMap.size % colors.length]);
    }
    return colorMap.get(user);
  }

  ws.onopen = () => {
    console.log("WebSocket connected!");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const userColor = getColorForUser(data.username);
    msgs = [
      ...msgs,
      { text: `${data.username}: ${data.txt}`, color: userColor },
    ];
  };

  // function sendMessage() {
  //   if (username && message) {
  //     ws.send(JSON.stringify({ username, message }));
  //     msgs = [...msgs, `me: ${message}`];
  //     message = '';  // Clear the message input after sending
  //   }
  // }

  const send = function () {
    const txt = document.getElementById("text").value;
    console.log("Text:", txt);
    ws.send(JSON.stringify({ username: $username, txt: txt }));
    const myColor = getColorForUser($username);
    msgs = [...msgs, { text: `${$username}: ${txt}`, color: myColor }];
    message = ""; // Clear the input after sending
  };
</script>

<div id="messages-container">
  {#each msgs as msg}
    <h3 style="color: {msg.color};">{msg.text}</h3>
  {/each}
</div>

<div id="container">
  <div id="username-div">
    <label for="username">Enter your username</label>
    <input id="username" type="text" bind:value={$username} required />
  </div>
  <div id="text-div">
    <label for="text">Enter a message</label>
    <input id="text" type="text" on:change={send} required />
  </div>
</div>

<style>
  #container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  #username-div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #text-div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #messages-container {
    overflow: scroll;
  }
  #messages-container::-webkit-scrollbar {
    display: none;
  }
</style>
