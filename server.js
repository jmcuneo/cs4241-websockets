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
let width = 400;
let height = 400;
let minSize = 10;
let bouncers = [
  {
    size:50,
    x:0,
    y:0,
    xVel:1,
    yVel:1,
    color:"#ff0000"
  },
  {
    size:80,
    x:200,
    y:200,
    xVel:-1,
    yVel:1,
    color:"#00ff00"
  }
];

const stepBouncers = function(){
  for(let i = 0; i < bouncers.length; i++){
    bouncers[i].x+=bouncers[i].xVel;
    bouncers[i].y+=bouncers[i].yVel;
    if(bouncers[i].x > width || bouncers[i].x < 0){
      bouncers[i].xVel*=-1;
    }
    if(bouncers[i].y > height || bouncers[i].y < 0){
      bouncers[i].yVel*=-1;
    }
  }
}

const app = express()
const app2 = express()

const server = http.createServer( app2 ),
      socketServer = new WebSocketServer({ server }),
      clients = []

socketServer.on( 'connection', client => {
  console.log( 'connect!' )
    
  // when the server receives a message from this client...
  // client.on( 'message', msg => {
	//   // send msg to every client EXCEPT the one who originally sent it
  //   clients.forEach( c => { if( c !== client ) c.send( msg ) })
  // })

  setInterval(()=>{
    stepBouncers();
    clients.forEach(c=>{
      c.send(JSON.stringify(bouncers));
    })
  },50);

  client.on('message',(data)=>{
    data = JSON.parse(data);
    if(data.type=="split"){
      let index = data.index;
      var oldBouncer = bouncers[index];
      if(oldBouncer.size > minSize){
        var spdX = Math.abs(oldBouncer.xVel);
        var spdY = Math.abs(oldBouncer.yVel);
        var newBouncers = [
          {
            size:oldBouncer.size/2,
            x:oldBouncer.x,
            y:oldBouncer.y,
            xVel:-spdX,
            yVel:-spdY,
            color:oldBouncer.color
          },
          {
            size:oldBouncer.size/2,
            x:oldBouncer.x+oldBouncer.size/2,
            y:oldBouncer.y,
            xVel:spdX,
            yVel:-spdY,
            color:oldBouncer.color
          },
          {
            size:oldBouncer.size/2,
            x:oldBouncer.x,
            y:oldBouncer.y+oldBouncer.size/2,
            xVel:-spdX,
            yVel:spdY,
            color:oldBouncer.color
          },
          {
            size:oldBouncer.size/2,
            x:oldBouncer.x+oldBouncer.size/2,
            y:oldBouncer.y+oldBouncer.size/2,
            xVel:spdX,
            yVel:spdY,
            color:oldBouncer.color
          }
        ];
        Array.prototype.push.apply(bouncers,newBouncers);
      }
      bouncers.splice(index,1);
    }else if(data.type=="grow"){
      let index = data.index;
      bouncers[index].size*=2;
      bouncers[index].x
    }
  });

  // add client to client list
  clients.push( client )
})

server.listen( 5000 )

ViteExpress.listen( app , 3000);