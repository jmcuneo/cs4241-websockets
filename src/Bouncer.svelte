<script>
    export let x;
    export let y;
    export let len;
    export let color;

    let envLen = Math.min(
        document.body.scrollWidth,
        document.body.scrollHeight,
    );
</script>

<button
    style="left:{x * envLen}; top:{y * envLen}; background_color:{color}"
    on:click
    on:contextmenu
>
</button>
