<script>
	let msgs = [];
	let username = "";

	const ws = new WebSocket("ws://127.0.0.1:3000");

	// when connection is established...
	ws.onopen = () => {
		ws.send("a new client has connected.");

		ws.onmessage = async (msg) => {
			// add message to end of msgs array,
			// re-assign to trigger UI update
			const messages = JSON.parse(await msg.data);
            console.log(messages);
			msgs = messages;
			//msgs = msgs.concat([ message.name + ': ' + message.msg ])
		};
	};

	const send = function () {
		const txt = document.querySelector("#message").value;
		ws.send(JSON.stringify({ name: username, msg: txt }));
		msgs = msgs.concat([{name: username, msg: txt}]);
	};

	const changeUserName = function () {
		username = document.querySelector("#user").value;
		document.querySelector("#message").style.display = "block";
		document.querySelector("#user").style.display = "none";
	};

  let date = new Date();
	let current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
  
</script>
<h4>{current_time}</h4>
<h2>{username}</h2>
<input
	id="user"
	type="text"
	on:change={changeUserName}
	placeholder="enter your name" />
<input id="message" type="text" on:change={send} style="display: none" />
{#each msgs as msg}
	<h3>{msg.name}: {msg.msg}</h3>
{/each}
