import mongoose from 'mongoose'
import savedConsumptionSchema from './savedConsumptionSchema'

module.exports = mongoose.model('savedConsumption', savedConsumptionSchema)