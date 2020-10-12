import React from 'react'

import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './Security/PrivateRoute'


////// General 
import Home from './Components/Layouts/Home'
import Login from './Components/Layouts/Login'
import UserProfile from './Components/Layouts/Users/UserProfile'
////// End-General 


////// Menu 
import MainMenu from './Components/Layouts/MainMenu'

////// Image 
import MenuImage from './Components/Layouts/Menu/MenuImage'
import NumberPatternRecognition from './Components/Layouts/Image/NumberPatternRecognition'
////// End-Image 

////// Text 
import MenuText from './Components/Layouts/Menu/MenuText'
////// End-Text 

////// ManagementSystem 
import MenuManagementSystem from './Components/Layouts/Menu/MenuManagementSystem'
import ManagementUsers from './Components/Layouts/ManagementSystem/ManagementUsers'
////// End-ManagementSystem 

////// End-Menu 


////// * 
import { PageNotFound } from './Components/Containers/SomethingWrong'
////// * 

import { TypeSuperPrivacy } from './Store/DataBases/Menu.DataBases'

const BaseRouter = (props) => {
    // const isFullScreen = props.isFullScreen ? props.isFullScreen : false
    return (
        <Switch>


            {/* General */}
            <Route
                exact
                path="/"
                component={() =>
                    <Home />
                }
            />
            <Route
                exact
                path="/login"
                component={() =>
                    <Login />
                }
            />
            <Route
                exact
                path="/users/profile"
                component={() =>
                    <UserProfile />
                }
            />
            {/* End-General */}


            {/* Menu */}
            <Route
                exact
                path="/menu"
                component={() =>
                    <MainMenu />
                }
            />

            {/* Image */}
            <Route
                exact
                path="/image"
                component={() =>
                    <MenuImage />
                }
            />
            <Route
                exact
                path="/image/number-pattern-recognition"
                component={() =>
                    <NumberPatternRecognition />
                }
            />
            {/* End-Image */}

            {/* Text */}
            <Route
                exact
                path="/text"
                component={() =>
                    <MenuText />
                }
            />
            {/* End-Text */}

            {/* ManagementSystem */}
            <PrivateRoute
                exact
                path="/management"
                SecurityType={TypeSuperPrivacy}
                component={() =>
                    <MenuManagementSystem />
                }
            />
            <PrivateRoute
                exact
                path="/management/users"
                SecurityType={TypeSuperPrivacy}
                component={() =>
                    <ManagementUsers />
                }
            />
            {/* End-ManagementSystem */}

            {/* End-Menu */}


            {/* * */}
            <Route
                path="*"
                component={() =>
                    <PageNotFound />
                }
            />
            {/* * */}


        </Switch>
    )
}

export default BaseRouter