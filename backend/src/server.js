import { ApolloServer, gql } from 'apollo-server'
import jwt from 'jsonwebtoken'
import util from 'util'
import mongoose from 'mongoose'

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

var connectionstring = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb/jankonenergia?authSource=admin`
mongoose.connect(connectionstring,{ useNewUrlParser: true }, function(err) { if(err) console.log(err) })
server.listen().then(({ url }) => {
    console.log(`Jankon Energia Server ready at ${url}`)
  })