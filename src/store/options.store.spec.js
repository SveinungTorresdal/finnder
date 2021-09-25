import { options as store } from './options.store'

describe('Store \'options\'', () => {
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

    it.each`
    key                 | type          | objClass  | value
    ${'budget'}         | ${'number'}   | ${null}   | ${10000}
    ${'commuteTime'}    | ${'object'}   | ${Date}   | ${undefined}
    ${'isOpen'}         | ${'boolean'}  | ${null}   | ${false}
    ${'maxCommute'}     | ${'number'}   | ${null}   | ${15}
    `('store has $key of type $type ($objClass) with value $value', ({ key, type, objClass, value }) => {
        let storeData
        // eslint-disable-next-line no-return-assign
        const unsub = store.subscribe(data => storeData = data)
        unsub()

        const { [key]: item } = storeData

        expect(item).toBeDefined()
        expect(typeof item).toEqual(type)

        if (value !== undefined) {
            expect(item).toStrictEqual(value)
        }

        if (objClass) {
            expect(item).toBeInstanceOf(objClass)
        }
    })

    it.each`
    func
    ${'set'}
    ${'toggleOpen'}
    `('has method $func', ({ func }) => {
        expect(store[func]).toBeDefined()
        expect(typeof store[func]).toEqual('function')
    })

    it('method \'toggleOpen\' inverts boolean \'isOpen\'', () => {
        let storeData
        // eslint-disable-next-line no-return-assign
        const unsub = store.subscribe(data => storeData = data)

        expect(storeData.isOpen).toBeFalsy()

        store.toggleOpen()

        expect(storeData.isOpen).toBeTruthy()

        store.toggleOpen()

        expect(storeData.isOpen).toBeFalsy()

        unsub()
    })
})