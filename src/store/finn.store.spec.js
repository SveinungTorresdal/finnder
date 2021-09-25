import { finn as store } from './finn.store'

describe('Store \'finn\'', () => {
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
    ${'description'}    | ${'string'}   | ${null}   | ${''}
    ${'location'}       | ${'object'}   | ${null}   | ${{}}
    ${'placeId'}        | ${'string'}   | ${null}   | ${''}
    ${'timestamp'}      | ${'object'}   | ${Date}   | ${undefined}
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
    ${'ping'}
    ${'save'}
    `('has method $func', ({ func }) => {
        expect(store[func]).toBeDefined()
        expect(typeof store[func]).toEqual('function')
    })

    it('method \'ping\' updates timestamp', () => {
        let storeData
        // eslint-disable-next-line no-return-assign
        const unsub = store.subscribe(data => storeData = data)

        const { timestamp: oldstamp } = storeData

        store.ping(123)

        const { timestamp: newstamp } = storeData

        store.ping()

        const { timestamp: finstamp } = storeData

        expect(oldstamp).not.toEqual(newstamp)
        expect(oldstamp).not.toEqual(finstamp)
        expect(newstamp).toEqual(123)
        expect(newstamp).not.toEqual(finstamp)

        unsub()
    })

    it('method \'save\' sets individual fields; timestamp updates', () => {
        let storeData
        // eslint-disable-next-line no-return-assign
        const unsub = store.subscribe(data => storeData = data)

        // Get original values
        const { description: originalDescription, location: originalLocation, placeId: originalPlace, timestamp: originalTimestamp } = storeData

        // Try to save new values
        const loc = { lat: 59.9098906, lng: 10.7419112 }
        store.save({ description: 'Kongens gate 6, Oslo', location: { ...loc }, timestamp: 123 })

        // Get new values
        const { description: k6Description, location: k6Location, timestamp: k6Timestamp } = storeData

        // Description updates
        expect(originalDescription).toEqual('')
        expect(k6Description).not.toEqual(originalDescription)
        expect(k6Description).toEqual('Kongens gate 6, Oslo')

        // Location updates
        const originalLocationKeys = Object.keys(originalLocation)
        const k6LocationKeys = Object.keys(k6Location)
        expect(originalLocationKeys.length).toEqual(0)
        expect(originalLocationKeys.length).not.toEqual(k6LocationKeys.length)
        expect(k6LocationKeys).toEqual(expect.arrayContaining(['lat', 'lng']))
        expect(k6Location).toEqual(loc)

        expect(k6Timestamp).not.toBe(originalTimestamp)
        expect(k6Timestamp).toEqual(123)

        const place = 'ChIJnfnfYohuQUYRGUHOWh6kJqA'
        store.save({ placeId: place, timestamp: 987 })

        // Get updated data after setting 'placeId'
        const { placeId: updatedPlace, timestamp: updatedTimestamp } = storeData

        // placeId updates
        expect(updatedPlace).not.toEqual(originalPlace)
        expect(updatedPlace).toEqual(place)
        expect(updatedTimestamp).not.toEqual(originalTimestamp)
        expect(updatedTimestamp).not.toEqual(k6Timestamp)

        unsub()
    })
})