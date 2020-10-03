import React, { Fragment, useEffect } from 'react'

import { BrowserRouter as Router } from 'react-router-dom'

import { connect } from 'react-redux'

// import { Hide_Logo } from './Store/Actions/General.Actions'

import { ThemeProvider, CssBaseline, useMediaQuery } from '@material-ui/core'
import { MUI_Initial_State, LightTheme, DarkTheme } from './MUI'

import Navbar from './Components/Layouts/Navbar'
import BaseRouter from './Router'

const App = (props) => {
  useEffect(() => {
    // props.Hide_Logo(false)
    // eslint-disable-next-line
  }, [])
  const minScreenWidth = MUI_Initial_State.units.minWidth_first
  const isFullScreen = useMediaQuery(`(min-width:${minScreenWidth}px)`)
  const isDarkMode = props.isDarkMode ? props.isDarkMode : false
  return (
    <Fragment>
      <ThemeProvider
        theme={isDarkMode ?
          { ...DarkTheme }
          : { ...LightTheme }}
      >
        <CssBaseline />
        <Router>
          <Navbar
            isFullScreen={isFullScreen}
          />
          <BaseRouter
          // isFullScreen={isFullScreen}
          />
        </Router>
      </ThemeProvider>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  // ////// Generic
  isDarkMode: state.General.isDarkMode,
})

const mapDispatchToProps = dispatch => ({
  // Hide_Logo: (e) => dispatch(Hide_Logo(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
