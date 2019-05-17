import mongoose from 'mongoose'
import profileSchema from './profileSchema'

module.exports = mongoose.model('profile', profileSchema)