process.env.PORT = 5000

async function tearDown ({ server }) {
  await server.close()
}
global.tearDown = tearDown