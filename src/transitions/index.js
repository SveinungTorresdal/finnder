import { slide } from 'svelte/transition';
import { elasticOut } from 'svelte/easing';

export function fadeSlide(node, options) {
    const slideTrans = slide(node, options)
    return {
        duration: options.duration,
        css: t => `
            ${slideTrans.css(t)}
            opacity: ${t};
        `
    };
}

export function widthResize(node, {duration}) {
    return {
        duration,
        css: t => {
            return `
                max-width: calc(${t} * 100%)
            `
        }
    }
}