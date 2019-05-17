import SavedConsumption from '../db/models/savedConsumptionModel'
import mongoose from 'mongoose'
import {ApolloError} from 'apollo-server'

exports.createSavedConsumption = async (args) => {
    let consumption = {
        userId: args.savedConsumption.userId,
        consumptionTypeId: args.savedConsumption.consumptionTypeId,
        value: args.savedConsumption.value,
        date: new Date(args.savedConsumption.date)
    }
    return SavedConsumption.create(consumption)
}

exports.getSavedConsumptions = async (args) => {
    const from = new Date(args.from)
    const to = new Date(args.to)
    return SavedConsumption.find({userId: args.userId, date: { "$gte" : from, "$lt" : to}})
}

exports.getAllSavedConsumptions = async (args) => {
    return SavedConsumption.find({userId: args.userId})
}

exports.removeSavedConsumption = async (args) => {
    return SavedConsumption.findOne({_id: mongoose.Types.ObjectId(args._id)})
    .then((result) => {
        if(result) {
            return SavedConsumption.findOneAndRemove({_id: mongoose.Types.ObjectId(args._id)}, {useFindAndModify: false})
        } else {
            throw new ApolloError("No such object!")
        }
    })
}