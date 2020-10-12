import React, { Fragment, useEffect, useState } from 'react'

import { connect } from 'react-redux'

import { Link as GoTo } from 'react-router-dom'

import { useTheme, AppBar, Toolbar, Grid, Button, Drawer, Grow, Fade } from '@material-ui/core'

import { HiMenu } from 'react-icons/hi'

import { Major_Menu_Data } from '../../Store/DataBases/Menu.DataBases'
import Logo from '../../IMG/Logo.png'
import FullNavbar from './FullNavbar'

const Navbar = (props) => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const handleScroll = () => {
        const position = window.pageYOffset
        setScrollPosition(position)
    }
    const [isDrawerOpen, setDrawerCondition] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const vhToPixel = (vh) => {
        return Math.round(window.innerHeight / (100 / vh))
    }
    const NavMenuData = Major_Menu_Data()
    const Theme = useTheme()
    const ThemeTextPrimary = Theme.palette.text.primary
    const isFullScreen = props.isFullScreen ? props.isFullScreen : false
    const isLogoHide = props.isLogoHide ? props.isLogoHide : false
    // const isLogoHide = props.isLogoHide ? props.isLogoHide : true
    const ToolbarHeight = 12

    return (
        <Fragment>

            <AppBar
                position='relative'
                style={{ border: '1 px solid red', boxShadow: 'none', backgroundColor: 'transparent', padding: '1%' }}
            >
                <Toolbar
                    style={{ margin: 0, height: `${ToolbarHeight}vh`, padding: '1vh 1vw 1vh 1vw', border: 'none' }}
                >
                    <GoTo
                        to='/'
                        style={{ left: 0, position: 'absolute', marginLeft: '5vw', }}
                    >
                        {isLogoHide === true ?
                            null
                            : <Fade
                                in={isLogoHide ? false : true}
                                timeout={800}
                            >
                                <img
                                    src={Logo}
                                    alt='logo'
                                    style={{ width: '6vw', minWidth: 58, height: '9vh', marginLeft: '0px' }}
                                />
                            </Fade>
                        }
                    </GoTo>
                    {isFullScreen ?
                        <div
                            style={{ border: 'none', width: '100%', marginLeft: '15vw', marginRight: '15vw' }}
                        >
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                {NavMenuData.map((item, index) => (
                                    (index > 0 && index < 6 && index < NavMenuData.length - 1) ?
                                        (!item.PrivacyType || item.PrivacyType === 'Public') ?
                                            <Fragment
                                                key={`NavMenuData${index}`}
                                            >
                                                <GoTo
                                                    to={item.Url ? item.Url : '/PageNotFound'}
                                                    style={{ textDecoration: 'none', border: 'none', color: ThemeTextPrimary, fontSize: '2vw', display: 'inline-block', height: 'auto', width: '15%', marginLeft: '2.5%', marginRight: '2.5%', marginTop: '1vh', wordBreak: 'normal' }}
                                                >
                                                    <center>
                                                        {item.Title}
                                                    </center>
                                                </GoTo>
                                            </Fragment>
                                            : null
                                        : null
                                ))}
                            </Grid>
                        </div>
                        : null
                    }

                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setDrawerCondition(true)}
                        style={{ right: 0, position: 'absolute', width: isFullScreen ? '6vw' : '13vw', height: '9vh', fontSize: isFullScreen ? '1vw' : '1.5vw', borderRadius: '10px', boxShadow: 'none', marginRight: '5vw' }}
                    >
                        More Menu
                    </Button>

                </Toolbar>
            </AppBar>
            <Grow
                in={scrollPosition > vhToPixel(ToolbarHeight + 2) ? true : false}
                timeout={600}
            >
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setDrawerCondition(true)}
                    style={{
                        ...{ right: 0, top: 0, position: 'fixed', borderRadius: 0, width: '6vw', height: '6vw', boxShadow: '0 2px 4px -1px #010101', fontSize: '3vw' },
                        // ...{ visibility: scrollPosition > vhToPixel(ToolbarHeight + 1) ? 'visible' : 'hidden' }
                    }}
                >
                    <HiMenu />
                </Button>
            </Grow>

            <Drawer
                anchor='top'
                open={isDrawerOpen}
            // onClose={setDrawerCondition(false)}
            // style={{backgroundColor:'black'}}
            >
                {isDrawerOpen ?
                    <FullNavbar
                        isFullScreen={isFullScreen}
                        CloseFunction={setDrawerCondition}
                    // MenuData={NavMenuData}
                    />
                    : null}
            </Drawer>

        </Fragment >
    )
}

const mapStateToProps = state => ({
    // ////// Generic
    isLogoHide: state.General.isLogoHide,
})

export default connect(mapStateToProps, null)(Navbar)