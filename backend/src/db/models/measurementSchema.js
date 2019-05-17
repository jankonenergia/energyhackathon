import mongoose from 'mongoose'
const Schema = mongoose.Schema
const measurementSchema = mongoose.Schema({
    userId: { type: String },
    value: { type: Number },
    date: {type: Date}
},{
  timestamps: true
})
export default measurementSchema