import { Loader as MapsLoader } from "@googlemaps/js-api-loader"
import { readable } from 'svelte/store'

export const loader = new MapsLoader({
    apiKey: 'MAPS_API_KEY',
    version: "weekly",
    libraries: ['places'],
    region: 'no'
})

export const loading = readable(true, set => {
    loader.load().
        then(() => {
            set(loader.loading)
        })

    return function stop() {}
})

export default loading