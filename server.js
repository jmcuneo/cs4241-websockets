/* 
1. Open up a socket server
2. Maintain a list of clients connected to the socket server
3. When a client sends a message to the socket server, forward it to all
connected clients
*/

import express from 'express'
import http from 'http'
import ViteExpress from 'vite-express'
import { WebSocketServer } from 'ws'

const app = express()
app.use(express.json());

const server = http.createServer(app)
const socketServer = new WebSocketServer({ server })
const clients = new Map();

socketServer.on('connection', client => {
    console.log('connect!')


    

    // when the server receives a message from this client...
    client.on('message', (data) => {
        // Convert buffer to string and parse JSON
        const messageString = data.toString();
        console.log('Received Raw Data:', messageString);  // Log the raw string data
        const { username, txt } = JSON.parse(messageString);
        console.log('Received Message:', username, txt);  // Log the parsed message
        if (!clients.has(client)) {
            clients.set(client, username);
        }

        // Forward the message to all clients except the sender
        clients.forEach((user, c) => {
            if (c !== client) {
                c.send(JSON.stringify({ username: user, txt }));
                console.log(JSON.stringify({ username: user, txt }));
            }
        });
    });

    client.on('close', () => {
        clients.delete(client);
    });
});

server.listen(3000, () => console.log('Server is running on http://localhost:3000'));