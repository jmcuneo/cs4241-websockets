<script>
    const body = document.body;

    let x = 0;
    let y = 0;
    let xd = -1;
    let yd = -1;
    let len = 0.1;

    function step() {
        // move
        x += xd;
        y += yd;

        // bounce
        if (x < 0) {
            xd *= -1;
            x *= -1;
        }
        if (y < 0) {
            yd *= -1;
            y *= -1;
        }
        if (x > 1) {
            xd *= -1;
            x = (1 - len) * 2 - x;
        }
        if (y > 1) {
            yd *= -1;
            y = (1 - len) * 2 - y;
        }
    }

    let envLen = Math.min(body.scrollWidth, body.scrollHeight);

    setInterval(step, 10);
</script>

<div style="left:{x * envLen} top:{y * envLen}">
    <img class="full-width" src="color_wheel_crop.png" />
</div>
