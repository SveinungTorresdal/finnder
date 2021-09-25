import { writable } from 'svelte/store'

function createFinn () {
    const { subscribe, update } = writable({
        description: '',
        location: {},
        placeId: '',
        timestamp: new Date()
    })

    return {
        ping: (timestamp = Date.now()) => update(c => ({ ...c, timestamp })),
        subscribe,
        save: (data, timestamp = Date.now()) => update(c => ({ ...c, timestamp, ...data }))
    }
}

export const finn = createFinn()

export default finn