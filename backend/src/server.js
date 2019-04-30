import { ApolloServer, gql } from 'apollo-server'
import jwt from 'jsonwebtoken'
import util from 'util'

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const bearerToken = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null
    if (bearerToken) {
        const payload = await util.promisify(jwt.verify)(bearerToken, 'jankonenergia') //TODO: Move to env variable
        return { user: payload }
    }
    return null
  } 
})

server.listen().then(({ url }) => {
    console.log(`Jankon Energia Server ready at ${url}`)
  })