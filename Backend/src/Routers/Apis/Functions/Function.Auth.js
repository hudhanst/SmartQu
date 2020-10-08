const Token = require('../../../Models/Token')
const User = require('../../../Models/User')

exports.Cek_SuperUser = async () => {
    const isSuperUserExist = await User.findOne({ isSuperUser: true })
    if (isSuperUserExist) {
        return false
    } else {
        return true
    }
}

exports.Cek_User_Expired = (ExpiredTime) => {
    try {
        const CurrentTime = new Date()
        if (ExpiredTime > CurrentTime) {
            return false
        } else {
            return true
        }
    } catch (err) {
        console.log('Log: exports.Cek_User_Expired -> err', err)
        throw {
            msg: 'exports.Cek_User_Expired',
            errorDetail: err
        }
    }
}

exports.Create_Token = async (UserId) => {
    try {
        if (!UserId) {
            throw {
                msg: 'There is no UserId'
            }
        } else {
            const isUserHasTokenAlready = await Token.findOneAndDelete({ UserId: UserId })
            const newToken = new Token({
                UserId: UserId,
                ExpiredDate: undefined
            })
            const ReturnToken = newToken.save()
            return ReturnToken
        }
    } catch (err) {
        console.log('Log: exports.Create_Token -> err', err)
        throw {
            msg: err.msg ? err.msg : "exports.Create_Token",
            errorDetail: err
        }
    }
}