
import {AuthenticationError} from 'apollo-server'
import {logIn, createProfile, getProfile, getAllProfiles, deleteProfile, updateProfile} from './actions/profileOperations'
import {getHousing, createOrUpdateHousing, removeHousing} from './actions/housingOperations'
import {getMeasurements, createMeasurement, deleteMeasurement} from './actions/measurementOperations'
import {getFriends, addFriend, unFriend} from './actions/friendOperations'
import {getChallenges,getChallenge, createChallenge, removeChallenge} from './actions/challengeOperations'
import {getConsumptionTypes, getConsumptionType} from './actions/consumptionTypeOperations'
import {getSavedConsumptions, getAllSavedConsumptions, createSavedConsumption, removeSavedConsumption} from './actions/savedConsumptionTypeOperations'

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
      },
      getFriends: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getFriends(args)
      },
      getChallenges: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getChallenges(args.userId)

      },
      getChallenge: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getChallenge(args)
      },
      getConsumptionTypes: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getConsumptionTypes()
      },
      getSavedConsumptions: (org, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getSavedConsumptions(args)
      },
      getAllSavedConsumptions: (org, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getAllSavedConsumptions(args)
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
      },
      addFriend: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return addFriend(args.userId, args.nickname)
      },
      unFriend: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return unFriend(args.userId, args.friendId)
      },
      createChallenge: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return createChallenge(args)
      },
      removeChallenge: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return removeChallenge(args)
      },
      createSavedConsumption: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return createSavedConsumption(args)
      },
      removeSavedConsumption: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return removeSavedConsumption(args)
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
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getHousing(obj._id)
      },
      challenges: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getChallenges(obj._id)
      },
      friends: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getFriends(obj)
      }
    }, 
    HousingInfo: {
      user: (obj,args,context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getProfile(obj.userId)
      }
    },
    Friend: {
      user: (obj,args,context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getProfile(obj.userId)
      },
      friend: (obj,args,context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getProfile(obj.friendId)
      }
    },
    Challenge: {
      user: (obj,args,context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getProfile(obj.userId)
      }
    },
    SavedConsumption: {
      consumptionType: (obj, args, context) => {
        if(!context.user) {
          throw new AuthenticationError('must authenticate')
        }
        return getConsumptionType(obj)
      }
    }
  }

  module.exports = {
    resolvers
}