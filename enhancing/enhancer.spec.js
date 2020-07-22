const enhancer = require('./enhancer.js');
// test away!

const item = {
    name: 'test',
    durability: 10,
    enhancement: 0
}

const item2 = {
    name: 'test2',
    durability: 10,
    enhancement: 20
}

const item3 = {
    name: 'test3',
    durability: 0,
    enhancement: 11
}

describe('repair()', () => {

    it('should restore items durability to 100', () => {

        const expected = { ...item, durability: 100 }

        const actual = enhancer.repair(item)
        // console.log('actual repair:', actual)
        expect(actual).toEqual(expected)

        expect(enhancer.repair(item)).toStrictEqual({ ...item, durability: 100 })
    })

})


describe('succes()', () => {

    it('should on success, not change enhancement at level 20', () => {
        const expected = item2

        const actual = enhancer.success(item2)
        // console.log('actual success:', actual)
        expect(actual).toEqual(expected)

        expect(enhancer.success(item2)).toStrictEqual(item2)
    })


    it('should on success, +1 to enhancement when level is not 20', () => {
        const expected = { ...item, enhancement: item.enhancement + 1 }

        const actual = enhancer.success(item)
        // console.log('actual success:', actual)
        expect(actual).toEqual(expected)

        expect(enhancer.success(item)).toStrictEqual({ ...item, enhancement: item.enhancement + 1 })
    })

    it('should throw an error if enhancement level i greater than 20', () => {
        expect(() => {
            enhancer.success({ name: test, durability: 0, enhancement: 21 })
        }).toThrow()

        expect(() => {
            enhancer.success({ name: test, durability: 0, enhancement: 21 })
        }).toThrowError('enhancement level cannot be greater than 20')
    })

    it('should make enhancement 1 if enhancement is a - number ==> turn it to 0 first then add +1', () => {
        expect(enhancer.success({ name: test, durability: 0, enhancement: -1 })).toEqual({ name: test, durability: 0, enhancement: 1 })

        expect(enhancer.success({ name: test, durability: 0, enhancement: -5 })).toEqual({ name: test, durability: 0, enhancement: 1 })
    })
})

describe('fail()', () => {

    it('should decrease durability by 5 if enhancement < 15', () => {
        const expected = { ...item, durability: item.durability - 5 }

        const actual = enhancer.fail(item)
        // console.log('actual fail:', actual)
        expect(actual).toEqual(expected)
    })

    it('should make durability 0, if enhancement < 15 and durability would go -', () => {
        expect(enhancer.fail(item3)).toStrictEqual({ ...item3, durability: 0 })

        expect(enhancer.fail({ ...item, durability: 3 })).toEqual({ ...item, durability: 0 })
    })


    it('should decrease durability by 10 if enhancement >= 15', () => {

        const test = {
            name: 'test',
            durability: 20,
            enhancement: 15
        }

        const expected = { ...test, durability: test.durability - 10 }

        const actual = enhancer.fail(test)
        // console.log('actual fail:', actual)
        expect(actual).toEqual(expected)
    })

    it('should make durability 0, if enhancement >= 15 and durability would go -', () => {
        expect(enhancer.fail({ ...item, durability: 9, enhancement: 16 })).toEqual({ ...item, enhancement: 16, durability: 0 })
    })

    it('should decrease durability by 10 and and decrease enhancement level by 1 if enhancement > 16 ', () => {
        const test = {
            name: 'test',
            durability: 20,
            enhancement: 17
        }

        const expected = { ...test, durability: test.durability - 10, enhancement: test.enhancement - 1 }

        const actual = enhancer.fail(test)
        // console.log('actual fail:', actual)
        expect(actual).toEqual(expected)
    })

    it('should throw an error if enhancement lvl is negative', () => {
        const test = {
            name: 'test',
            durability: 11,
            enhancement: -1
        }

        expect(() => {
            enhancer.fail(test)
        }).toThrow()

        expect(() => {
            enhancer.fail(test)
        }).toThrowError('enhancement level cannot be negative')

    })

})

describe('get()', () => {

    it('should do nothing if enhancement = 0', () => {
        const expected = item

        const actual = enhancer.get(item)
        expect(actual).toEqual(expected)
    })

    it('should modify the name if enhancement > 0', () => {
        const expected = {
            ...item2,
            name: `[+${item2.enhancement}] ${item2.name}`
        }

        const actual = enhancer.get(item2)
        // console.log('actual get:', actual)
        expect(actual).toStrictEqual(expected)
        expect(actual.name).toContain(`[+${item2.enhancement}]`)
    })

    it('should make enhancement 0 if enhancement is negative', () => {
        const test = {
            name: 'test',
            durability: 5,
            enhancement: -10
        }

        const expected = {...test, enhancement: 0}

        const actual = enhancer.get(test)

        expect(actual).toEqual(expected)
    })
})