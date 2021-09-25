import { loading as store, loader } from './loading.store'
import flushPromises from 'flush-promises'

// We need a promise and a way to manually resolve it at will
function createPromise () {
    let resolver
    // eslint-disable-next-line no-return-assign
    let promise = new Promise(resolve => { resolver = resolve })
    return [
        promise,
        resolver
    ]
}

describe('Store \'loading\'', () => {
    let resolveLoader

    beforeEach(() => {
        jest.resetAllMocks()
        const [mockPromise, mockResolver] = createPromise()
        jest.spyOn(loader, 'load').mockImplementation(() => mockPromise)
        resolveLoader = mockResolver
    })

    it('is defined', () => {
        expect(store).toBeDefined()
    })

    it('is a store with \'subscribe\' method; can unsubscribe', () => {
        expect(store.subscribe).toBeDefined()
        expect(typeof store.subscribe).toEqual('function')

        const unsub = store.subscribe(() => {})

        expect(unsub).toBeDefined()
        expect(typeof unsub).toEqual('function')

        unsub()
    })

    it('has readable boolean; defaults to false; updates when resolved', async () => {        
        // Creating mocks
        let isLoading
        // eslint-disable-next-line no-return-assign
        const unsub = store.subscribe(data => isLoading = data)

        expect(isLoading).toStrictEqual(true)

        // resolve the loader
        resolveLoader()

        await flushPromises()

        expect(isLoading).toStrictEqual(false)

        unsub()
    })
})