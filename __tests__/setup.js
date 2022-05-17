async function tearDown ({ server }) {
  await server.close()
}
global.tearDown = tearDown