import ConsumptionType from '../db/models/consumpionTypeModel'
import mongoose from 'mongoose'
import {ApolloError} from 'apollo-server'

exports.getConsumptionTypes = () => {
    return ConsumptionType.find({})
}

exports.getConsumptionType = (args) => {
    return ConsumptionType.findOne({_id: mongoose.Types.ObjectId(args.consumptionTypeId)})
}