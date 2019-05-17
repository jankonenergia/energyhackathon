import mongoose from 'mongoose'
import consumptionTypeSchema from './consumptionTypeSchema'

module.exports = mongoose.model('consumptionType', consumptionTypeSchema)