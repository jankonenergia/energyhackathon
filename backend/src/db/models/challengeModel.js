import mongoose from 'mongoose'
import challengeSchema from './challengeSchema'

module.exports = mongoose.model('challenge', challengeSchema)