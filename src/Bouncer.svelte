<script>
    export let x;
    export let y;
    export let len;
    export let color;

    let envLen = Math.min(
        document.body.scrollWidth,
        document.body.scrollHeight,
    );

    //$: x, console.log(x);
    $: len, console.log(len);
</script>

<button
    style="left:{x * envLen}px; top:{y * envLen}px; width: {len *
        envLen}px; height:{len * envLen}px; background-color:{color};"
    on:click
    on:contextmenu
>
</button>
