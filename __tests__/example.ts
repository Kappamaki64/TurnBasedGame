describe('example test', () => {
  let sum: (a: number, b: number) => number
  beforeAll(() => {
    sum = (a, b) => a + b
  })

  it('test 1 + 2', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
