import { writable } from 'svelte/store'

function createOptions () {
    const { subscribe, set, update } = writable({
        budget: 10000,
        commuteTime: new Date(),
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

export default options