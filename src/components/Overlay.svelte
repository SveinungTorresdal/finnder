<div class={`position-absolute top-0 start-0 h-100 w-100 pe-none ${added}`}>
    <slot></slot>
</div>
<script>
    let added = ''
    export { added as class }
</script>