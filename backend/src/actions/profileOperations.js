import profile from '../db/models/profileModel'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { valueFromNode } from 'apollo-utilities';

exports.logIn = (username, password) => {
    const hash = crypto.createHmac('sha256', process.env.PROFILE_HASH_SECRET)
                   .update(password)
                   .digest('hex')
    return profile.findOne({nickname: username, password: hash}).select('-password')
    .then((result) => {
        if(result) {
            var token = jwt.sign({user: result}, process.env.PROFILE_JWT_SECRET)
            let resultUser = result
            resultUser['token'] = token.toString()
            return resultUser

        } else {
            return null
        }
    })

}

exports.createProfile = (args) => {
    let user = args.user
    user.password = crypto.createHmac('sha256', process.env.PROFILE_HASH_SECRET)
                    .update(user.password)
                    .digest('hex')
    let createdUser = profile.create(user)
    return createdUser
}
