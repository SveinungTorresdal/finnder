<div {...overlay}>
    <slot></slot>
</div>
<script>
    export let added = ''

    $: overlay = {
        class: `position-absolute top-0 start-0 h-100 w-100 pe-none ${added}`
    }
</script>