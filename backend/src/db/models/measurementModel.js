import mongoose from 'mongoose'
import measurementSchema from './measurementSchema'

module.exports = mongoose.model('measurement', measurementSchema)