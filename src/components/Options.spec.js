const path = require('path')
const filename = path.basename(__filename)
const name = path.parse(path.parse(filename).name).name

import { render } from '@testing-library/svelte'

describe(filename, () => {
    let Component

    beforeAll(async () => {
        Component = await import(`./${name}.svelte`)
    })

    it('is defined', () => {
        const wrapper = render(Component)

        expect(wrapper).toBeDefined()
    })
})