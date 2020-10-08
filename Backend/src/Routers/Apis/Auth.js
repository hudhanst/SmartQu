const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

const MidAuth = require('../Middleware/Auth')

const User = require('../../Models/User')
const { Cek_SuperUser, Create_Token } = require('./Functions/Function.Auth')
const { Create_SuperUser } = require('./Functions/Function.User')
const Token = require('../../Models/Token')

//// @router  POST api/auth/login
//// @desc    Auth user
//// @access  Public
router.post('/login', async (req, res) => {
    // console.log('Log: req', req.body)
    try {
        const { UserName, Password } = req.body
        if (!UserName || !Password) {
            throw {
                msg: 'Some data missing'
            }
        }
        if (UserName === 'superuser' && Password === 'superuser') {
            const isFirstTimeUse = await Cek_SuperUser()
            if (isFirstTimeUse) {
                const CreateSuperUser = await Create_SuperUser('superuser', 'superuser', 'superuser')
            }
        }
        // const UserData = await User.findOne({ UserName: UserName }).select('-Password -ProfilePicture -LastActive -RegisterDate')
        const UserData = await User.findOne({ UserName: UserName })
        if (!UserData) {
            throw {
                msg: 'User not found'
            }
        }
        if (!UserData.isActive) {
            throw {
                msg: 'User not active'
            }
        }
        const isMatch = await bcrypt.compare(String(Password), UserData.Password)
        if (!isMatch) {
            throw {
                msg: 'username / password incorrect'
            }
        }

        const thisTime = new Date()

        const newLastActive = await User.findByIdAndUpdate(UserData._id, { $set: { LastActive: thisTime } })////// TODO not test yet
        const token = await Create_Token(UserData._id)

        console.log(`${UserData._id} Login, token = ${token._id}`)

        return res.status(200)
            .json({
                token: token._id,
                user: {
                    id: UserData._id,
                    UserName: UserData.UserName,
                    Name: UserData._Name,
                    isActive: UserData._isActive,
                    isAdmin: UserData._isAdmin,
                    isSuperUser: UserData._isSuperUser,
                }
            })
    } catch (err) {
        console.log(`Error /login => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'Error /login',
            errorDetail: err.errorDetail ? err.errorDetail : err
        })
    }
})

//// @router  GET api/auth/user
//// @desc    Get user data
//// @access  Private
router.get('/user', MidAuth, async (req, res) => {
    try {
        const UserId = req.user
        // console.log('Log: UserId', UserId)
        const UserData = await User.findById(UserId, '-Password -ProfilePicture -LastActive -RegisterDate')

        return res.status(200).json(UserData)
    } catch (err) {
        console.log(`Error /user => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(404).json(err)
    }
})

//// @router  POST api/auth/logout
//// @desc    Logout User from token
//// @access  Private
router.post('/logout', MidAuth, async (req, res) => {
    // console.log('/logout')
    try {
        const UserId = req.user
        const DeleteToken = await Token.findOneAndDelete({ UserId: UserId })

        console.log(`/logout = ${UserId}`)
        return res.status(200).json({
            msg: 'Log Out Successfully'
        })
    } catch (err) {
        // console.log('Log: err', err)
        console.log(`Error /logout => ${err.errorDetail ? err.errorDetail : err}`)
        return res.status(404).json(err)
    }
})

module.exports = router
