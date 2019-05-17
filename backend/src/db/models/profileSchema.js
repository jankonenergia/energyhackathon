import mongoose from 'mongoose'
const Schema = mongoose.Schema
const profileSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    nickname: {type: String},
    password: {type: String}
},{
  timestamps: true
})
export default profileSchema