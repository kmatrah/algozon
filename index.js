if (process.env.APP_ID && process.env.API_KEY) {
  const server = require('./src/server')
  server.start()
} else {
  console.error("You must provide an Application ID and an Admin API KEY.")
}