import mongoose from 'mongoose'
const Schema = mongoose.Schema
const savedConsumptionSchema = mongoose.Schema({
    userId: { type: String },
    consumptionTypeId: { type: String},
    value: { type: String },
    date: { type: Date }
},{
  timestamps: true
})
export default savedConsumptionSchema