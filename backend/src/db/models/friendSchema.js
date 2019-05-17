import mongoose from 'mongoose'
const Schema = mongoose.Schema
const profileSchema = mongoose.Schema({
    userId: {type: String},
    friendId: {type: String}
},{
  timestamps: true
})
export default profileSchema