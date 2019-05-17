import mongoose from 'mongoose'
const Schema = mongoose.Schema
const consumptionTypeSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    amount: { type: Number }, 
    amountType: {type: String } 
},{
  timestamps: true
})
export default consumptionTypeSchema