const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const MidAuth = require('../Middleware/Auth')
const { isSuperUser, isOwnerOrSuperUser } = require('../Middleware/Permission')

const User = require('../../Models/User')

const StaticFolderPath = require('../../config/keys').StaticFolderPath

const { Create_User, Create_Hashed_Password } = require('./Functions/Function.User')

////// MULTER SETTING
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, `./${StaticFolderPath}/Users/`)

    },
    filename: (req, file, cd) => {
        // console.log('fieldname', file.fieldname)
        // console.log('originalname', file.originalname)
        // console.log('extname', path.extname(file.originalname))
        const ThisTime = new Date()
        // cd(null, ThisTime.toISOString().replace(/:/g, '-') + file.originalname)
        cd(null, ThisTime.toISOString().replace(/:/g, '-') + path.extname(file.originalname))
        // const isFileExist = fs.existsSync(`./${StaticFolderPath}/users/${ThisTime.toISOString().replace(/:/g, '-') + file.originalname}`)
        // console.log('Log: isFileExist', isFileExist)
    }
})
const fileFilter = (req, file, cd) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cd(null, true)
    } else {
        cd(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30
    },
    fileFilter: fileFilter
})
////// End-MULTER SETTING

//// @router  GET api/users/
//// @desc    get list all user 
//// @access  Private
router.get('/', MidAuth, async (req, res) => {
    try {
        const UserList = await User.find(null, '_id, UserName Name')
        console.log('UserList')
        return res.status(200).json(UserList)
    } catch (err) {
        console.log('Error /user/ =>', err)
        return res.status(400).json({
            msg: 'Something wrong on User List',
            errorDetail: err
        })
    }
})

//// @router  GET api/users/user/:id
//// @desc    get a user detail
//// @access  Private
router.get('/user/:id', MidAuth, async (req, res) => {
    // console.log('/user/:id')
    try {
        const UserDetail = await User.findById(req.params.id).select('-Password')
        console.log(`UserDetail = ${req.params.id}`)
        return res.status(200).json(UserDetail)
    } catch (err) {
        console.log('Error /user/:id =>', err)
        return res.status(400).json({
            msg: 'Something wrong on User Detail',
            errorDetail: err
        })
    }
})

//// @router  POST api/users/registration
//// @desc    Register a new user
//// @access  Private && isSuperUser
router.post('/registration', upload.single('ProfilePicture'), MidAuth, isSuperUser, async (req, res) => {
    // console.log('/registration')
    try {
        const newUser = await Create_User(req.body.UserName, req.body.Password, req.body.Name, req.file ? req.file.path : null, null, req.body.isAdmin, req.body.isSuperUser, null, null)
        console.log('Log: newUser', newUser)
        return res.status(200).json(newUser)
    } catch (err) {
        console.log('Log: err', err)
        console.log(`Error /register => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'Something wrong on User Registration',
            errorDetail: err
        })
    }
})

//// @router  POST api/users/user/:id/update
//// @desc    Update user detail
//// @access  Private && isOwnerOrSuperUser
router.post('/user/:id/Update', upload.single('ProfilePicture'), MidAuth, isOwnerOrSuperUser, async (req, res) => {
    console.log('/user/:id/update')
    try {
        if (req.body.Password) {
            const HashedPassword = await Create_Hashed_Password(req.body.Password)
            req.body.Password = HashedPassword
        }
        if (req.file) {
            req.body.ProfilePicture = req.file.path
        }
        const UpdatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
        console.log('Log: UpdatedUser', UpdatedUser)
        return res.status(200).json(UpdatedUser)
    } catch (err) {
        console.log(`Error /user/Update => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'Something wrong on User Update',
            errorDetail: err
        })
    }
})

//// @router  POST api/users/user/:id/delete
//// @desc    Delete a User
//// @access  Private && isSuperUser
router.delete('/user/:id/delete', MidAuth, isSuperUser, async (req, res) => {
    console.log('/user/:id/delete')
    try {
        const DeletedUser = await User.findByIdAndDelete(req.params.id)
        console.log('Log: DeletedUser', DeletedUser)
        return res.status(200).json(DeletedUser)
    } catch (err) {
        console.log(`Error /register => ${err.errorDetail ? err.errorDetail : typeof err === 'object' ? JSON.stringify(err) : err}`)
        return res.status(400).json({
            msg: err.msg ? err.msg : 'Something wrong on User Delete',
            errorDetail: err
        })
    }
})
module.exports = router