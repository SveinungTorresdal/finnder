<style>
    form {
        max-width: 720px;
    }
</style>

{#if !$loading}
<form transition:fadeSlide="{{ duration: 80 }}" on:submit|preventDefault class="mb-4 me-5 me-lg-0 mt-xl-0 bg-white shadow rounded pe-auto w-100">
    {#if !!alert.text}
    <Alert isOpen={!!alert.text} toggle={toggleAlert} color={alert.color} class="address-expansion mb-0 rounded-0 rounded-top" dismissible fade={false}>
        <strong>{alert.text}</strong>
    </Alert>
    {:else if places.length > 0}
    <Table borderless hover class="address-expansion mb-0 bg-light border-bottom rounded-0 rounded-top">
        <tbody>
            {#each places as place}
            <tr in:fadeSlide="{{ duration: 90 }}">
                <td class="p-3" data-placeid={place.place_id} tabindex="0" role="button" on:click={setPlace}>
                    {#each text(place) as snippet}
                        {#if snippet.strong}
                        <strong>{snippet.text}</strong>
                        {:else}
                        {snippet.text}
                        {/if}
                    {/each}
                </td>
            </tr>
            {/each}
        </tbody>
    </Table>
    {/if}

    <div class="d-flex flex-row">
        <Input
            aria-label="Enter an address"    
            bind:value={address}
            class="p-3"
            id="address-search"
            name="search"
            placeholder="Search address"
            plaintext
            on:input="{search}"
            type="search"
        />
        <Button
        class="border-0 rounded-pill m-2"
            color={$finn.description ? 'primary' : 'secondary'}
            disabled={!$finn.description}
            id="center-map-button"
            on:click={setCenter}
            outline
            type="button"
        >
            <Icon aria-hidden="true" name="geo-alt" />
        </Button>
        <Tooltip placement="top" target="center-map-button">
            Center map on location
        </Tooltip>
        <Button
            class="border-0 rounded-pill m-2"
            color="primary"
            id="open-options-menu-button"
            on:click={options.toggleOpen}
            outline
            type="button"
        >
            <Icon aria-hidden="true" name="sliders" />
        </Button>
        <Tooltip placement="top" target="open-options-menu-button">
            Open options menu
        </Tooltip>
    </div>
</form>
{/if}

<script>
    /* global google */

    // Components
    import { fadeSlide } from '../transitions'
    import { Alert, Button, Icon, Input, Table, Tooltip } from 'sveltestrap'

    // Store
    import { finn, loading, options } from '../store'

    // Reactive data
    $: AutocompleteService = !$loading ? new google.maps.places.AutocompleteService() : null
    $: GeocoderService = !$loading ? new google.maps.Geocoder() : null

    $: addressExpanded = document.querySelector('.address-expansion')
    
    // Data
    let address = ''
    let alert = {
        color: 'info',
        text: ''
    }
    let bouncer
    let componentRestrictions = { country: 'no' }
    let places = []
    let sessionToken = null

    // Methods
    function search () {
        clearTimeout(bouncer)
        bouncer = setTimeout(() => {
            if (address.length < 2) {
                alert.text = ''
                places = []
                return
            }
            if (AutocompleteService) {
                if (!sessionToken) {
                    sessionToken = new google.maps.places.AutocompleteSessionToken()
                }

                AutocompleteService.getPlacePredictions({ componentRestrictions, input: address, sessionToken }, (predictions, status) => {
                    if (status === 'OK') {
                        alert.text = ''
                        places = [...predictions]
                    }
 else if (status === 'ZERO_RESULTS' || status === 'NOT_FOUND') {
                        alert = {
                            color: 'light',
                            text: 'No results'
                        }
                        places = []
                    }
 else {
                        alert = {
                            color: 'danger',
                            text: status
                        }
                    }
                })
            }
		}, 500)
    }

    function setCenter () {
        if (!$finn.location) { return }

        finn.ping()
    }

    function setPlace ({ target: el }) {
        const description = el.innerText
        const placeId = el.getAttribute('data-placeid')

        address = description
        places = []

        GeocoderService.geocode({ placeId }, result => {
            const { geometry: { location } } = result[0]

            finn.save({ description, location, placeId })
        })
    }

    function text ({ description = '', matched_substrings = [] }) {
        if (!description || !matched_substrings.length) { return [] }
        
        let list = []
        let current = 0

        matched_substrings.forEach(match => {
            const before = description.substr(current, match.offset - current)
            const emphasis = description.substr(match.offset, match.length)
            current = current + before.length + emphasis.length
            if (before) {
                list.push({
                    text: before,
                    strong: false
                }) 
            }
            list.push({
                text: emphasis,
                strong: true
            })
        })

        const last = description.substr(current)
        if (last) {
            list.push({
                text: last,
                strong: false
            })
        }

        return list
    }

    function toggleAlert () {
        alert.text = ''
    }

</script>