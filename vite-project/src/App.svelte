<html lang="en">
  <head>
    <style>
      body { 
        margin:0; 
        background:black 
      } 
    </style>
    <script>
      let ws, msgs = [], ctx = null
      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      
      

      window.onload = function() {
        ws = new WebSocket( 'ws://127.0.0.1:3000' )

        ws.onopen = () => {
          ws.onmessage = async msg => {
            const pos = await msg.data.text()
            const [x,y] = pos.split( ':' ).map( v => parseInt(v) )

            ctx.fillStyle = 'red'
            ctx.fillRect( x,y,50,50 )
          }
        }

        const canvas = document.querySelector('canvas')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        canvas.addEventListener("mousemove", function (e) {
            ws.send( `${e.pageX-50}:${e.pageY-50}` )
            ctx.fillStyle = "#" + randomColor
            ctx.fillRect( e.pageX,e.pageY,50,50 )
        })
        ctx = canvas.getContext( '2d' )

        window.onmousedown = e => {
            ws.send( `${e.pageX-50}:${e.pageY-50}` )
            ctx.fillStyle = "#" + randomColor
            ctx.fillRect( e.pageX,e.pageY,50,50 )
        }
      }
    </script>
  </head>
  <body>
    <canvas></canvas>
  </body>
</html>
