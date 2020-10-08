const User = require('../../../Models/User')
const bcrypt = require('bcryptjs')

const Create_User = async (UserName, Password, Name, ProfilePicture, isActive, isAdmin, isSuperUser, RegisterDate, LastActive) => {
    try {
        if (!UserName || !Password || !Name) {
            throw {
                msg: 'Some data are miss'
            }
        }
        const isUserNameUsed = await User.findOne({ UserName: UserName })
        if (isUserNameUsed) {
            throw {
                msg: 'UserName already used'
            }
        }

        const salt = await bcrypt.genSalt(10)
        const HashedPassword = await bcrypt.hash(String(Password), salt)

        const newUser = new User({
            UserName: UserName,
            Password: HashedPassword,
            Name: Name,
            ProfilePicture: ProfilePicture ? ProfilePicture : undefined,
            isActive: isActive ? isActive : undefined,
            isAdmin: isAdmin ? isAdmin : undefined,
            isSuperUser: isSuperUser ? isSuperUser : undefined,
            RegisterDate: RegisterDate ? RegisterDate : undefined,
            LastActive: LastActive ? LastActive : undefined
        })

        const SavedUser = newUser.save()
        return SavedUser
    } catch (err) {
        console.log('Log: Create_User -> err', err)
        throw {
            msg: err.msg ? err.msg : "exports.Create_User",
            errorDetail: err
        }
    }
}

exports.Create_SuperUser = async (UserName, Password, Name, ProfilePicture) => {
    try {
        const newSuperUser = await Create_User(UserName, Password, Name, ProfilePicture, true, true, true)
        return newSuperUser
    } catch (err) {
        console.log('Log: exports.Create_SuperUser -> err', err)
        throw {
            msg: err.msg ? err.msg : "exports.Create_SuperUser",
            errorDetail: err
        }
    }
}