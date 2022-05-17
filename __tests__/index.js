import request from 'supertest'

import { server } from '../src/index.js'

afterAll(async () => {
  await global.tearDown({ server })
})

describe('API root path', ()=>{
  it('responds to root', async ()=>{
    const response = await request(server).get('/api/')
    expect(response.statusCode).toBe(200)
  })
})
