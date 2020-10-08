import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from './Components/Layouts/Home'
import Login from './Components/Layouts/Login'
import Profile from './Components/Layouts/Users/Profile'
import MenuImageRecognition from './Components/Layouts/Menu/MenuImageRecognition'
import { PageNotFound } from './Components/Containers/SomethingWrong'

const BaseRouter = (props) => {
    // const isFullScreen = props.isFullScreen ? props.isFullScreen : false
    return (
        <Switch>
            <Route
                exact
                path="/"
                component={() =>
                    <Home />
                }
            />

            <Route
                exact
                path="/image-recognition"
                component={() =>
                    <MenuImageRecognition />
                }
            />

            <Route
                exact
                path="/users/profile"
                component={() =>
                    <Profile />
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
                path="*"
                component={() =>
                    <PageNotFound />
                }
            />
        </Switch>
    )
}

export default BaseRouter