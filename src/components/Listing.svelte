<style>
    aside, img {
        --size: 4rem;
        height: var(--size);
        width: var(--size);
        object-fit: cover;
    }

    .empty {
        filter: brightness(0) contrast(.1);
    }

    .rating {
        font-size: 0;
    }

    .rating > * {
        font-size: 1rem;
        line-height: 1.4rem;
    }

    .text-overflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<ListGroupItem class="p-3 d-flex flex-row">
    <aside class={`bg-light border border-2 ${img ? 'border-primary' : ''} me-3 overflow-hidden rounded-circle`}>
        {#if img}
        <img alt="House" src={img} />
        {/if}
    </aside>
    <main class="flex-grow-1 p-1 d-flex flex-column justify-content-center text-overflow">
        <h2 class="fs-6 mb-2 w-100 text-overflow">{street}</h2>
        <div class="mb-0 d-flex flex-row">
            <div class="d-inline-block rating me-3">
                <span>
                    {#each { length: stars } as _, i}
                        ⭐
                    {/each}
                </span>
                <span class="empty">
                    {#each { length: totalStars - stars } as _, i}
                        ⭐
                    {/each}
                </span>
            </div>
            <strong class="d-inline-block text-primary w-50">{commute} min.</strong>
        </div>
    </main>
</ListGroupItem>

<script>
    import { ListGroupItem } from 'sveltestrap'

    export let commute = 5
    export let img = ''
    export let street = 'Gatenavn nr. 123, Distrikt'

    const totalStars = 3
    const commuteBreakpoint = 8

    $: stars = totalStars - Math.min(totalStars, Math.floor(commute / commuteBreakpoint))

</script>