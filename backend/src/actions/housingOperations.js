import Housing from '../db/models/housingModel'
import mongoose from 'mongoose'
import {ApolloError} from 'apollo-server'

exports.getHousing = async (userId) => {
    return Housing.findOne({userId: userId})
}

exports.createOrUpdateHousing = async (args) => {
    let housing = args.housing
    if(housing._id) {
        const id = mongoose.Types.ObjectId(housing._id)
        return Housing.findOneAndUpdate({_id: id}, housing, { returnNewDocument: true, useFindAndModify: false })
    } else {
        return Housing.create(housing)
    }
}

exports.removeHousing = async (args) => {
    return Housing.findOne({_id: mongoose.Types.ObjectId(args._id)})
                .then((result) => {
                    if(result) {
                        return Housing.findOneAndRemove({_id: mongoose.Types.ObjectId(args._id)}, {useFindAndModify: false})
                    } else {
                        throw new ApolloError("No such object!")
                    }
                })
}

