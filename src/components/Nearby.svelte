<style lang="scss">
    main {
        max-width: 100vw;
    }
    
    .list-cap {
        max-height: 100vh;
        overflow-y: auto;
    }
</style>

{#if !$loading}
<main transition:fadeSlide="{{ duration: 80 }}" class="align-items-center d-flex flex-row justify-content-end ps-4 ps-md-0">
    <div class="border-0 bg-white p-0 pe-auto rounded-0 rounded-start shadow">
        <Button color="primary" class="border-0 px-2 py-3 pe-auto rounded-0 rounded-start" on:click={toggleExpansion} outline>
            <Icon name={expanded ? 'chevron-right' : 'chevron-left'} />
        </Button>
    </div>
    {#if expanded}
    <div transition:widthResize="{{ duration: 80 }}" class="bg-white flex-grow-1 overflow-hidden pe-auto rounded-start text-nowrap shadow">
        <ul class="list-group list-group-flush list-cap px-2">
            <Listing commute="5" img="https://i.imgur.com/OTbWegk.png" street="Jolly Kramer-Johansens gate 84, Oslo" />
            <Listing commute="7" />
            <Listing commute="10" />
            <Listing commute="13" />
            <Listing commute="15" />
            <Listing commute="20" />
            <Listing commute="30" />
            <Listing commute="40" />
            <Listing commute="7" />
            <Listing commute="10" />
            <Listing commute="13" />
            <Listing commute="15" />
            <Listing commute="20" />
            <Listing commute="30" />
        </ul>
    </div>
    {/if}
</main>
{/if}

<script>
    import { Button, Icon } from 'sveltestrap'
    import { loading } from '../store'
    import { fadeSlide, widthResize } from '../transitions'

    import Listing from './Listing.svelte'

    let expanded = false

    function toggleExpansion () {
        expanded = !expanded
    }
</script>