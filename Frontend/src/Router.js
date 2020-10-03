import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from './Components/Layouts/Home'
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
                path="*"
                component={() =>
                    <PageNotFound />
                }
            />
        </Switch>
    )
}

export default BaseRouter