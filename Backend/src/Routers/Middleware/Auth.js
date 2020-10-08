const SecretCode = require('../../config/keys').SecretCode

const { Cek_User_Expired } = require('../Apis/Functions/Function.Auth')

const Token = require('../../Models/Token')

const MidAuth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) {
            return res.status(401).json({
                msg: 'Access denied, there is no token'
            })
        }

        const TokenDetail = await Token.findById(token)

        const isUserExpired = Cek_User_Expired(TokenDetail.ExpiredDate)

        if (!isUserExpired) {
            // const User = null
            req.user = TokenDetail.UserId
            next()
        } else {
            const DeleteToken = await Token.findByIdAndDelete(token)
            throw {
                msg: 'Token Expired',
            }
        }

    } catch (err) {
        console.log(`Error Auth => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        // console.dir(err)
        res.status(400).json({
            msg: err.msg ? err.msg : 'Token invalid',
            errorDetail: err
        })
    }
}

module.exports = MidAuth