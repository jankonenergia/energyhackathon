import { ApolloServer, gql } from 'apollo-server'
import jwt from 'jsonwebtoken'
import util from 'util'
import mongoose from 'mongoose'
import DBSeed from "./db/seeds/dbSeed"
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const bearerToken = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null
    if (bearerToken) {
        const payload = await util.promisify(jwt.verify)(bearerToken, process.env.PROFILE_JWT_SECRET)
        return { user: payload.user }
    }
    return null
  } 
})

var connectionstring = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb/jankonenergia?authSource=admin`
mongoose.connect(connectionstring, { useNewUrlParser: true }, 
  (err) =>  { 
    if(err) {
      console.log(err) 
    }
    //Dataseeds  
    DBSeed.seed()
  })
server.listen().then(({ url }) => {
    console.log(`Jankon Energia Server ready at ${url}`)
})