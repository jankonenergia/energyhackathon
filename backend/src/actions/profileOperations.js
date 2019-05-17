import Profile from '../db/models/profileModel'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {ApolloError} from 'apollo-server'

exports.logIn = (username, password) => {
    const hash = crypto.createHmac('sha256', process.env.PROFILE_HASH_SECRET)
                   .update(password)
                   .digest('hex')
    return Profile.findOne({nickname: username, password: hash}).select('-password')
    .then((result) => {
        if(result) {
            var token = jwt.sign({user: result}, process.env.PROFILE_JWT_SECRET)
            let resultUser = result
            resultUser['token'] = token.toString()
            return resultUser

        } else {
            return null
        }
    })

}

exports.createProfile = async (args) => {
    let user = args.user
    user.password = crypto.createHmac('sha256', process.env.PROFILE_HASH_SECRET)
                    .update(user.password)
                    .digest('hex')
    return Profile.create(user)
}

exports.getProfile = async (userId) => {
    return Profile.findOne({_id: mongoose.Types.ObjectId(userId)})
}

exports.updateProfile = async ( args ) => {
   return Profile.findOneAndUpdate({_id: mongoose.Types.ObjectId(args.user._id)}, args.user, { returnNewDocument: true, useFindAndModify: false})
}

exports.deleteProfile = async (args) => {
    return Profile.findOne({_id: mongoose.Types.ObjectId(args._id)})
                .then((result) => {
                    if(result) {
                        return Profile.findOneAndRemove({_id: mongoose.Types.ObjectId(args._id)}, {useFindAndModify: false})
                    } else {
                        throw new ApolloError("No such object!")
                    }
                })
}

exports.getAllProfiles = async () => {
    return Profile.find({})
}