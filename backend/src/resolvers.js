
import {AuthenticationError} from 'apollo-server'
import {logIn, createProfile, getProfile, getAllProfiles, deleteProfile, updateProfile} from './actions/profileOperations'
import {getHousing, createOrUpdateHousing, removeHousing} from './actions/housingOperations'
import {getMeasurements, createMeasurement, deleteMeasurement} from './actions/measurementOperations'

const resolvers = {
    Query: {
      user: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getProfile(args.id)
      },
      users: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getAllProfiles()
      },
      me: (obj, args, context, info) => context.user,
      measurements: (obj, args, context, info) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getMeasurements(args)
      },
      friendMeasurements: (obj, args, context, info) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getMeasurements(args)
      },
      serverInfo: (obj, args, context) => { 
        if (!context.user) return null
        return { buildNumber: process.env.VERSION, commitMessage: process.env.COMMIT_MESSAGE, commit: process.env.COMMIT}
      }
    },
    Mutation: {
      logIn: (obj,args) => logIn(args.nickname, args.password),
      createUser: (obj, args) => createProfile(args),
      updateUser: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return updateProfile(args)
      },
      deleteUser: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return deleteProfile(args)
      },
      createOrUpdateHousing: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return createOrUpdateHousing(args, context)
      },
      deleteHousing: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return removeHousing(args)
      },
      createMeasurement: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return createMeasurement(args.measurement)
      },
      deleteMeasurement: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return deleteMeasurement(args)
      }
    },
    Measurement: {
      user: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getProfile(obj.userId)
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
        return getProfile(obj.userId)
      }
    }
  }

  module.exports = {
    resolvers
}