import request from 'supertest'

import { server } from '../src/index.js'

afterAll(async () => {
  await global.tearDown({ server })
})

describe('API', ()=>{
  it('responds to root', async ()=>{
    const response = await request(server).get('/api/')
    expect(response.statusCode).toBe(200)
  })
  it('returns 404 if route does not exist', async()=>{
    const response = await request(server).get('/api/elephants')
    expect(response.statusCode).toBe(404)
  })
})
