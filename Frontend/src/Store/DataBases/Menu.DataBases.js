import React from 'react'

import Store from '../Store'

import Home from '../../Components/Layouts/Home'
import MenuImage from '../../Components/Layouts/Menu/MenuImage'
import MenuText from '../../Components/Layouts/Menu/MenuText'
import MenuManagementSystem from '../../Components/Layouts/Menu/MenuManagementSystem'
import Menu from '../../Components/Layouts/MainMenu'

import { IoMdImages, IoIosPeople } from 'react-icons/io'
const IconStyle = { fontSize: '3vw' }

export const TypePublic = 'Public'
// export const TypePrivacy = 'Privacy'
export const TypeSuperPrivacy = 'SuperPrivacy'

const initialState = [
    {
        Title: "Home",
        Url: '/',
        PrivacyType: TypePublic,
        Comp: <Home />
    },
    {
        Title: "Image",
        Url: '/image',
        Comp: <MenuImage />,
        PrivacyType: TypePublic,
        MenuList: [
            {
                Title: "Number Pattern Recognition",
                Url: '/image/number-pattern-recognition',
                PrivacyType: TypePublic,
                Icon: <IoMdImages style={IconStyle} />,
            },
        ]
    },
    {
        Title: "Text",
        Url: '/text',
        PrivacyType: TypePublic,
        Comp: <MenuText />
    },
    {
        Title: "Management System",
        Url: '/management',
        PrivacyType: TypeSuperPrivacy,
        Comp: <MenuManagementSystem />,
        MenuList: [
            {
                Title: "Users",
                Url: '/management/users',
                PrivacyType: TypeSuperPrivacy,
                Icon: <IoIosPeople style={IconStyle} />
            },
        ]
    },
    {
        Title: "Other",
        Url: '/menu',
        PrivacyType: TypePublic,
        Comp: <Menu />
    }
]

export const Cek_Privacy_Access = (PrivacyStatus) => {
    // const UserDetail = Store.getState().Auth.User
    const UserDetail = Store.getState().Auth.User
    try {
        if (!PrivacyStatus || PrivacyStatus === TypePublic) {
            return true
        } else if (PrivacyStatus === TypeSuperPrivacy && (UserDetail?.isSuperUser ? UserDetail.isSuperUser : false)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log('Log: Cek_Privacy_Access -> err', err)
        return false
    }
}

export const All_Menu_Data = () => {
    const MajorMenuData = initialState
    return MajorMenuData
}

export const Major_Menu_Data = () => {
    const MajorMenuData = initialState
    return MajorMenuData
}

export const Some_Major_Menu_Data = (InputTitle) => {
    const SomeMajorMenuData = initialState.find(item => item.Title === InputTitle)
    return SomeMajorMenuData ? SomeMajorMenuData : {}
}