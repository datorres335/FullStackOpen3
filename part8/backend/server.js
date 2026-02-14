const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const context = require('./context')

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  })

  await server.start()
  

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, { context }),
  )
  const PORT = process.env.PORT || 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

module.exports = startServer