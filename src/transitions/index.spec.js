import { fadeSlide, widthResize } from './'

describe('Transition \'fadeSlide\'', () => {
    let transition = fadeSlide

    it('is defined', () => {
        expect(transition).toBeDefined()
        expect(typeof transition).toEqual('function')
    })
    it.todo('Find out how to test transitions')
})

describe('Transition \'widthResize\'', () => {
    let transition = widthResize

    it('is defined', () => {
        expect(transition).toBeDefined()
        expect(typeof transition).toEqual('function')
    })
    it.todo('Find out how to test transitions')
})