<style>
    main {
        max-width: 360px;
    }
</style>

{#if !$loading}
<main transition:fadeSlide="{{ duration: 80 }}" class="align-items-center d-flex flex-row justify-content-end ps-4 ps-md-0 w-100">
    <div class="border-0 bg-white p-0 pe-auto rounded-0 rounded-start shadow">
        <Button color="primary" class="border-0 px-2 py-3 pe-auto rounded-0 rounded-start" on:click={toggleExpansion} outline>
            <Icon name={expanded ? 'chevron-right' : 'chevron-left'} />
        </Button>
    </div>
    {#if expanded}
    <div transition:widthResize="{{ duration: 80 }}" class="bg-white flex-grow-1 p-2 overflow-hidden pe-auto rounded-start text-nowrap shadow">
        <ListGroup flush>
            <ListGroupItem tag="a" href="#">
                Active
            </ListGroupItem>
            <ListGroupItem tag="a" href="#">
                Dapibus ac facilisis in
            </ListGroupItem>
            <ListGroupItem tag="a" href="#">
                Morbi leo risus
            </ListGroupItem>
            <ListGroupItem tag="a" href="#">
                Porta ac consectetur ac
            </ListGroupItem>
        </ListGroup>
    </div>
    {/if}
</main>
{/if}

<script>
    import { Button, Icon, ListGroup, ListGroupItem } from 'sveltestrap'
    import { loading } from '../store'
    import { fadeSlide, widthResize } from '../transitions'

    let expanded = false

    function toggleExpansion () {
        expanded = !expanded
    }
</script>