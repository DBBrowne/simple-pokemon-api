import { tidyNewLines } from '../../src/common/stringUtils.js'

describe('tidyNewLines',()=>{
  it('removes new lines and page feeds', ()=>{
    const input = 'The plant blooms\nwhen it is\nabsorbing solar\u000cenergy. It stays\non the move to\nseek sunlight.'

    const output = tidyNewLines(input)

    const expected = 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.'
    expect(output).toMatch(expected)
  })
})