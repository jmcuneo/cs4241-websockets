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

const server = http.createServer( app ),
    socketServer = new WebSocketServer({ server }),
    clients = []

socketServer.on( 'connection', client => {
    console.log( 'connect!' )

    // when the server receives a message from this client...
    client.on( 'message', msg => {
        // send msg to every client EXCEPT the one who originally sent it
        let userID="User "+(clients.indexOf(client)+1);
        let userBuffer=Buffer.from(userID);
        let msgBuffer=Buffer.concat([userBuffer,msg]);
        clients.forEach( c => {

         if( c !== client ) c.send( msgBuffer )
         })
    })

    // add client to client list
    clients.push( client )
    let intro="You are User " + (clients.indexOf(client)+1);
    let introBuffer=Buffer.from(intro);
    client.send(introBuffer);
})

server.listen( 3000 )

ViteExpress.bind( app, server )
