import mongoose from 'mongoose'
import housingSchema from './housingSchema'

module.exports = mongoose.model('housing', housingSchema)