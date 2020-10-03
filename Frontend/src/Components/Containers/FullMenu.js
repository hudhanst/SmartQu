import React, { Fragment, useState } from 'react'

import { connect } from 'react-redux'

import { Link as GoTo } from 'react-router-dom'

// import Store from '../../Store/Store'
import { Dark_Mode } from '../../Store/Actions/General.Actions'

import { useTheme, Paper, Grid, Typography, Slide } from '@material-ui/core'

import { IoMdClose, IoMdSunny, IoMdMoon } from 'react-icons/io'
// import { BsSun } from 'react-icons/bs'

import Home from '../Layouts/Home'
import MenuImageRecognition from '../Layouts/Menu/MenuImageRecognition'
import { SomethingWrong } from '../Containers/SomethingWrong'

const FullMenu = (props) => {
    const [PreviewPage, setPreviewPage] = useState(null)
    console.log(PreviewPage)
    const Close_Drawer = () => {
        if (props.CloseFunction !== null) {
            props.CloseFunction(false)
        } else {
            console.error('Close_Drawer has not CloseFunction')
        }
    }

    const Change_Dark_Mode = (newDarkModeCondition) => {
        props.Dark_Mode(newDarkModeCondition)
        // Store.dispatch(Dark_Mode(newDarkModeCondition))
    }
    const isFullScreen = props.isFullScreen ? props.isFullScreen : false
    const isDarkMode = props.isDarkMode ? props.isDarkMode : false
    // const MenuData = props.MenuData ? props.MenuData : []
    const MenuData = [
        {
            Title: "Home",
            Url: '/',
            Comp: (<Home />)
        },
        {
            Title: "Image",
            Url: '/image-recognition',
            Comp: (<MenuImageRecognition />),
        },
        {
            Title: "Text",
            // Url: '/image-recognition',
            Comp: (<SomethingWrong />)
        },
        {
            Title: "Other",
            // Url: '/image-recognition',
            Comp: (<SomethingWrong />)
        }
    ]

    const Theme = useTheme()
    const ThemePrimaryMain = Theme.palette.primary.main
    const ThemePrimaryText = Theme.palette.text.primary
    const ThemePrimaryContrast = Theme.palette.primary.contrastText
    const ThemeBackgroundDefault = Theme.palette.background.default
    const ThemeBackgroundPaper = Theme.palette.background.paper

    return (
        <Paper
            variant='outlined'
            style={{ border: 'none', borderRadius: 0, width: '100vw', height: '100vh', backgroundColor: { ThemeBackgroundDefault } }}
        >
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {isFullScreen ?
                    <Slide
                        direction='right'
                        in={true}
                        timeout={500}
                    // mountOnEnter
                    // unmountOnExit
                    >
                        <Paper
                            variant='outlined'
                            style={{ border: 'none', borderRadius: 0, width: '70vw', height: '100vh', backgroundColor: { ThemeBackgroundPaper } }}
                        >
                            {PreviewPage ?
                                PreviewPage
                                : <Fragment>
                                    <Home />
                                </Fragment>
                            }
                        </Paper>
                    </Slide>
                    : null
                }
                <Slide
                    direction={isFullScreen ? 'left' : 'down'}
                    in={true}
                    timeout={500}
                // mountOnEnter
                // unmountOnExit
                >
                    <Paper
                        variant='outlined'
                        style={{ border: 'none', borderRadius: 0, width: isFullScreen ? '30vw' : "100vw", height: '100vh', backgroundColor: ThemePrimaryMain }}
                    >
                        <Typography>
                            {isDarkMode ?
                                <IoMdSunny
                                    onClick={() => Change_Dark_Mode(false)}
                                    style={{ color: ThemePrimaryContrast, cursor: "pointer", fontSize: '3vw', left: isFullScreen ? '70vw' : 0, top: 0, position: 'absolute' }}
                                />
                                : <IoMdMoon
                                    onClick={() => Change_Dark_Mode(true)}
                                    style={{ color: ThemePrimaryContrast, cursor: "pointer", fontSize: '3vw', left: isFullScreen ? '70vw' : 0, top: 0, position: 'absolute' }}
                                />
                            }
                            <IoMdClose
                                onClick={() => Close_Drawer()}
                                style={{ color: ThemePrimaryContrast, cursor: "pointer", fontSize: '3vw', right: 0, top: 0, position: 'absolute' }}
                            />
                        </Typography>
                        <div
                            style={{ marginTop: "15vh" }}
                        >

                        </div>
                        <div
                            style={{ marginTop: "1vh", padding: '1vw' }}
                        >
                            {MenuData.map((item, index) => (
                                <Typography
                                    key={`MenuData_${index}`}
                                    variant='h3'
                                    color='textPrimary'
                                    onMouseOver={() => setPreviewPage(item.Title ? item.Comp : <SomethingWrong />)}
                                    onClick={() => Close_Drawer()}
                                    style={{ margin: '1vw', }}
                                >
                                    <GoTo
                                        to={item.Url ? item.Url : '/PageNotFound'}
                                        style={{ textDecoration: 'none', color: ThemePrimaryText }}
                                    >
                                        {item.Title ? item.Title : ''}
                                    </GoTo>
                                </Typography>
                            ))}
                        </div>
                    </Paper>
                </Slide>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => ({
    // ////// Generic
    isDarkMode: state.General.isDarkMode,
})

const mapDispatchToProps = dispatch => ({
    Dark_Mode: (InputData) => dispatch(Dark_Mode(InputData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FullMenu)