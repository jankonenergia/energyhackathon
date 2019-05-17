import mongoose from 'mongoose'
const Schema = mongoose.Schema
const profileSchema = mongoose.Schema({
    address: {type: String},
    housingType: {type: String},
    size: {type: Number},
    heatingType: {type: String},
    userId: { type: String}
},{
  timestamps: true
})
export default profileSchema