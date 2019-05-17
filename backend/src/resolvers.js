import {logIn, createProfile} from './actions/profileOperations'

const resolvers = {
    Query: {
      user: (obj, args, context) => {
        if (!context.user) return null

        return null //TODO: to be changed
      },
      users: (obj, args, context) => {
        if (!context.user) return []

        return null //TODO: to be changed
      },
      logIn: (obj,args) => logIn(args.nickname, args.password),
      me: (obj, args, context, info) => context.user,
      energyMeasurements: (obj, args, context, info) => {
        if (!context.user) return []

        return null //TODO: to be changed
      },
      serverInfo: (obj, args, context) => { 
        if (!context.user) return null
        return { buildNumber: process.env.VERSION, commitMessage: process.env.COMMIT_MESSAGE, commit: process.env.COMMIT}
      }
    },
    Mutation: {
      createUser: (obj, args) => createProfile(args),
      createEnergyMeasurementReading: (obj, args) => {}
    }
  }

  module.exports = {
    resolvers
}