import Housing from '../db/models/housingModel'
import mongoose from 'mongoose'
exports.getHousing = async (userId) => {
    return Housing.findOne({userId: userId})
}

exports.createOrUpdateHousing = async (args) => {
    let housing = args.housing
    const id = mongoose.Types.ObjectId(housing._id)
    if(id) {
        return Housing.update({_id: id}, housing)
    } else {
        return Housing.create(housing)
    }
}

