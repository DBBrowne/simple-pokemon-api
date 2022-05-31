process.env.PORT = 5000

async function tearDown ({ server }) {
  console.log(server)
  await server.close()
}
global.tearDown = tearDown