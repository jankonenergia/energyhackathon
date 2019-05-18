import mongoose from 'mongoose'
const Schema = mongoose.Schema
const challengeSchema = mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    description: { type: String},
    limit: { type: Number },
    from: { type: Date},
    to: { type: Date }
},{
  timestamps: true
})
export default challengeSchema