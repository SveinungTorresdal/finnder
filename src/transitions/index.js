import { slide } from 'svelte/transition'

export function fadeSlide(node, { delay, duration, easing }) {
    const slideTrans = slide(node, { delay, duration, easing })
    return {
        duration,
        css: t => `
            ${slideTrans.css(t)}
            opacity: ${t};
        `
    }
}

export function widthResize(node, { duration }) {
    return {
        duration,
        css: t => `
            max-width: calc(${t} * 100%)
        `
    }
}