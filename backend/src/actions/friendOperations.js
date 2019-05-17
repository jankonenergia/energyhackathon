import Friend from '../db/models/friendModel'
import Profile from '../db/models/profileModel'
import mongoose from 'mongoose'
import {ApolloError} from 'apollo-server'

exports.getFriends = async (args) => {
    return Friend.find({userId: args._id})
}

exports.addFriend = async (userId, nickname) => {
    return Profile.findOne({nickname: nickname})
        .then((result) => {
            if(!result) {
                throw new ApolloError("No such object!")
            } else {
                return Friend.create({
                    userId: userId,
                    friendId: result._id
                })
            }
        })
}

exports.unFriend = async (userId, friendId) => {
    return Friend.findOneAndRemove({userId: userId, friendId: friendId}, {useFindAndModify: false})
} 