const User = require('../../Models/User')

exports.isSuperUser = async (req, res, next) => {
    try {
        const UserId = req.user
        if (!UserId) {
            return res.status(500).json({
                msg: 'User id not included'
            })
        }
        const UserDetail = await User.findById(UserId)

        if (UserDetail) {
            if (UserDetail.isSuperUser) {
                next()
            } else {
                return res.status(403).json({
                    msg: 'Action forbidden'
                })
            }
        } else {
            return res.status(401).json({
                msg: 'User detail not found'
            })
        }
    } catch (err) {
        console.log('Log: exports.isSuperUser -> err', err)
        return res.status(400).json({
            msg: 'Something wrong happen on Permission.isSuperUser'
        })
    }
}

exports.isOwnerOrSuperUser = async (req, res, next) => {
    try {
        const UserId = req.user
        const ActionUserId = req.params.id
        if (!UserId || !ActionUserId) {
            return res.status(500).json({
                msg: 'User Id or Action Id not included'
            })
        }
        const UserDetail = await User.findById(UserId)

        if (UserDetail) {
            if (UserDetail.isSuperUser || UserId === ActionUserId) {
                next()
            } else {
                return res.status(403).json({
                    msg: 'Action forbidden'
                })
            }
        } else {
            return res.status(401).json({
                msg: 'User detail not found'
            })
        }
    } catch (err) {
        console.log('Log: exports.isOwnerOrSuperUser -> err', err)
        return res.status(400).json({
            msg: 'Something wrong happen on Permission.isOwnerOrSuperUser'
        })
    }
}