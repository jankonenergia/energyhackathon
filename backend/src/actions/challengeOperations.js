import Challenge from '../db/models/challengeModel'
import mongoose from 'mongoose'
import {ApolloError} from 'apollo-server'

exports.createChallenge = async (args) => {

    let challenge = {
        userId: args.challenge.userId,
        title: args.challenge.title,
        description: args.challenge.description,
        from: args.challenge.from && new Date(args.challenge.from),
        limit: args.challenge.limit,
        to: args.challenge.to && new Date(args.challenge.to)
    }
    return Challenge.create(challenge)
}

exports.removeChallenge = async (args) => {
    return Challenge.findOne({_id: mongoose.Types.ObjectId(args._id)})
    .then((result) => {
        if(!result) {
            throw new ApolloError("No such object!")
        }
        return Challenge.findOneAndRemove({_id: mongoose.Types.ObjectId(args._id)}, {useFindAndModify: false})
    })
}

exports.getChallenges = async (userId) => {
    return Challenge.find({userId: userId})
}

exports.getChallenge = async (args) => {
    return Challenge.findOne({_id: mongoose.Types.ObjectId(args._id)})
}

exports.getTopList = async (args) => {
    let userId = mongoose.Types.ObjectId(args.userId)
    let challengeId = mongoose.Types.ObjectId(args.challengeId)
    
}
