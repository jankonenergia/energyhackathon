import mongoose from 'mongoose'
import friendSchema from './friendSchema'

module.exports = mongoose.model('friend', friendSchema)