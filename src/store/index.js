import { Loader as MapsLoader } from "@googlemaps/js-api-loader"
import { readable, writable } from 'svelte/store'

function createFinn () {
    const { subscribe, update } = writable({
        description: '',
        location: null,
        placeId: '',
        timestamp: Date.now()
    })

    return {
        ping: () => update(c => ({ ...c, timestamp: Date.now() })),
        subscribe,
        save: data => update(c => ({ ...c, timestamp: Date.now(), ...data }))
    }
}

export const finn = createFinn()

const loader = new MapsLoader({
    apiKey: 'MAPS_API_KEY',
    version: "weekly",
    libraries: ['places'],
    region: 'no'
})

export const loading = readable(true, set => {
    loader.load().
        then(() => set(loader.loading))

    return function stop() {}
})

function createOptions () {
    const { subscribe, set, update } = writable({
        budget: 10000,
        commuteTime: new Date().toISOString(),
        isOpen: false,
        maxCommute: 15
    })

    return {
        set,
        subscribe,
        toggleOpen: () => update(c => ({ ...c, isOpen: !c.isOpen }))
    }
}

export const options = createOptions()