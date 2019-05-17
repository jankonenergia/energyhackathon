import Housing from '../db/models/housingModel'

exports.getHousing = async (userId) => {
    console.log(userId)
    return Housing.findOne({userId: userId})

}

exports.createOrUpdateHousing = async (args) => {
    let housing = args.housing
    console.log(housing)
    const id = housing._id
    if(id) {
        return Housing.updateOne({_id: id}, housing)
    } else {
        let ho = Housing.create(housing)
        console.log(ho)
        return ho;
    }
}

