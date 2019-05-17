
import {AuthenticationError} from 'apollo-server'
import {logIn, createProfile, getProfile} from './actions/profileOperations'
import {getHousing, createOrUpdateHousing} from './actions/housingOperations'

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
      createEnergyMeasurementReading: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
      },
      createOrUpdateHousing: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return createOrUpdateHousing(args, context)
      }
    },
    User: {
      housing: (obj, args, context) => {
        return getHousing(obj._id)
      }
    }, 
    HousingInfo: {
      user: (obj,args,context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        getProfile(obj.userId, context)
      }
    }
  }

  module.exports = {
    resolvers
}