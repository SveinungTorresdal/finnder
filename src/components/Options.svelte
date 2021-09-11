<style>
    main {
        max-width: 720px;
    }
</style>

{#if $options.isOpen}
<main transition:fadeSlide="{{ duration: 90 }}" class="bg-white mb-4 me-5 me-lg-0 py-3 pe-auto rounded shadow w-100">
    <!-- More options menu based on category? -->
    <div class="d-flex flex-column flex-md-row ps-3">
        <div class="pe-3 flex-grow-1 w-100">
            <Label for="commute-time" class="text-center w-100">Estimate arrival on</Label>
            <Input
                bind:value={$options.commuteTime}
                type="datetime-local"
                name="datetime"
                id="commute-time"
                placeholder="datetime placeholder"
            />
        </div>
        <div class="pe-3 d-flex flex-column flex-grow-1 w-100">
            <Label for="max-commute-range" class="text-center w-100">Commute time</Label>
            <Input
                bind:value={$options.maxCommute}
                class="flex-grow-1 border-white p-3 rounded-pill w-100"
                id="max-commute-range"
                max={60}
                min={5}
                name="range"
                on:blur={hideFocus}
                on:focus={showFocus}
                placeholder="Range placeholder"
                step={5}
                type="range"
            />
            <strong class="d-block text-center w-100">Within {$options.maxCommute} minutes</strong>
        </div>
    </div>
</main>
{/if}

<script>
    import { fadeSlide } from '../transitions'
    import { Input, Label } from 'sveltestrap'
    import { options } from '../store'

    function showFocus ({ target }) {
        target.classList.remove('border-white')
        target.classList.add('border-primary')
    }

    function hideFocus ({ target }) {
        target.classList.remove('border-primary')
        target.classList.add('border-white')
    }

</script>