import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { Log_Out } from '../../../Store/Actions/Auth.Actions'
import { } from '../../../Store/Actions/User.Actions'

import { Redirect } from 'react-router-dom'

import { Container, Paper, Typography, Button, Fade } from '@material-ui/core'
import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI'

const Profile = (props) => {
    useEffect(() => {

    }, [])
    if (!props.isAuth && !props.token) {
        return <Redirect to='/login' />
    }
    return (
        <Container>
            <Fade
                in={true}
                timeout={1000}
            >
                <Paper>
                    <Typography
                        variant='h2'
                        align='center'
                    >
                        Profile
                    </Typography>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        onClick={() => props.Log_Out()}
                        style={{ ...MUI_FullWidth, ...MUI_VerticalMargin }}
                    >
                        Log Out
                    </Button>
                </Paper>
            </Fade>
        </Container>
    )
}

const mapStateToProps = state => ({
    ////// Generic
    // isDarkMode: state.General.isDarkMode,
    ////// Auth
    isAuth: state.Auth.isAuth,
    token: state.Auth.token,
})

const mapDispatchToProps = dispatch => ({
    Log_Out: () => dispatch(Log_Out()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)