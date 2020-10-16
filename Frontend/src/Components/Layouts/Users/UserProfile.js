import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { Log_Out } from '../../../Store/Actions/Auth.Actions'
import { Get_User_Id } from '../../../Store/Actions/User.Actions'

import { Redirect } from 'react-router-dom'

import { Container, Paper, Typography, Button, Fade } from '@material-ui/core'
import { MUI_VerticalMargin } from '../../../MUI'

import CreateModal from '../../Containers/CreateModal'

import UserDetail from '../../Containers/Users/UserDetail'
import UserUpdate from '../../Containers/Users/UserUpdate'

const UserProfile = (props) => {
    useEffect(() => {
        const UserId = props.User ? props.User._id : null
        if (UserId) {
            props.Get_User_Id(UserId)
        }
        // eslint-disable-next-line
    }, [])

    const ButtonStyle = { ...MUI_VerticalMargin, width: '98%' }

    if (!props.isAuth && !props.token) {
        return <Redirect to='/login' />
    }

    const UserId = props.User ? props.User._id : null

    return (
        <Container>
            <Fade
                in={true}
                timeout={1000}
            >
                <Paper
                    style={{ padding: '2%' }}
                >
                    <Typography
                        variant='h2'
                        align='center'
                    >
                        Profile
                    </Typography>

                    <UserDetail />

                    <center>
                        <CreateModal
                            ////// BUTTON 
                            ButtonLabel='Update'
                            ButtonColor='primary'
                            ButtonSize='large'
                            ButtonOnClickEvent={() => props.Get_User_Id(UserId)}
                            ButtonStyle={{ ...ButtonStyle }}
                            ////// MODAL
                            ModalSize='l'
                            ////// Header 
                            Header='Update'
                            ////// BODY 
                            Body={<UserUpdate />}
                        ////// FOOTER 
                        // Footer={}
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            size='large'
                            onClick={() => props.Log_Out()}
                            style={{ ...ButtonStyle }}
                        >
                            Log Out
                    </Button>
                    </center>
                </Paper>
            </Fade >
        </Container >
    )
}

const mapStateToProps = state => ({
    ////// Auth
    isAuth: state.Auth.isAuth,
    token: state.Auth.token,
    User: state.Auth.User,
    ////// User
})

const mapDispatchToProps = dispatch => ({
    Log_Out: () => dispatch(Log_Out()),
    Get_User_Id: (UserId) => dispatch(Get_User_Id(UserId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)