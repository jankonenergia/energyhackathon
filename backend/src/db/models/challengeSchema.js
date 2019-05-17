import mongoose from 'mongoose'
const Schema = mongoose.Schema
const challengeSchema = mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    description: { type: String},
    from: { type: Date},
    to: { type: Date }
},{
  timestamps: true
})
export default challengeSchema