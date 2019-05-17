import Measurement from '../db/models/measurementModel'
import mongoose from 'mongoose'
import {ApolloError} from 'apollo-server'

exports.getMeasurements = async (args) => {
    const from = new Date(args.from)
    const to = new Date(args.to)
    return Measurement.find({userId: args.userId, date: { "$gte" : from, "$lt" : to}})
}

exports.createMeasurement = async (args) => {

    const date = new Date(args.date)
    const measurement = {
        value: args.value,
        date: date.toDateString(),
        userId: args.userId
    }
    return Measurement.create(measurement)
}

exports.deleteMeasurement = async (args) => {
    return Measurement.findOne({_id: mongoose.Types.ObjectId(args._id)})
        .then((result) => {
            if(result) {
                return Measurement.findOneAndRemove({_id: mongoose.Types.ObjectId(args._id)}, {useFindAndModify: false})
            } else {
                throw new ApolloError("No such object!")
            }
        })
}