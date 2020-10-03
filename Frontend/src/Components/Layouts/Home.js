import React, { Fragment, useEffect } from 'react'

import { connect } from 'react-redux'

// import { Hide_Logo } from '../../Store/Actions/General.Actions'

import { Typography, Fade } from '@material-ui/core'

import Logo from '../../IMG/Logo.png'

const Home = (props) => {
    useEffect(() => {
        // props.Hide_Logo(true)
        // eslint-disable-next-line
    }, [])
    return (
        <Fragment>
            <Typography
                align='center'
                style={{ marginTop: '7vh' }}
            >
                <Fade
                    in={true}
                    timeout={1500}
                >
                    <img
                        src={Logo}
                        alt='logo'
                        style={{ border: 'none', width: '25vw', minWidth: 280, height: '45vh' }}
                    />
                </Fade>
            </Typography>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => ({
    // Hide_Logo: (e) => dispatch(Hide_Logo(e)),
})

export default connect(null, mapDispatchToProps)(Home)