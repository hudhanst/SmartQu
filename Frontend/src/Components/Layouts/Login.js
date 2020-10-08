import React, { useState } from 'react'

import { connect } from 'react-redux'
import { Log_In } from '../../Store/Actions/Auth.Actions'

import { Redirect } from 'react-router-dom'

import { Container, Paper, Typography, TextField, InputAdornment, IconButton, Button, Fade } from '@material-ui/core'
import { MUI_FullWidth, MUI_VerticalMargin } from '../../MUI'

import Logo from '../../IMG/Logo.png'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'

const Login = (props) => {
    const [state, setState] = useState({
        UserName: '',
        Password: '',
    })
    const [isHidePassword, setHidePassword] = useState(true)
    const Form_onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const Form_onSubmit = (e) => {
        e.preventDefault()
        props.Log_In(state.UserName, state.Password)
    }
    
    if (props.isAuth && props.token) {
        return <Redirect to='/' />
    }

    return (
        <Container
            maxWidth='md'
        >
            <Fade
                in={true}
                timeout={1000}
            >
                <Paper
                    variant='elevation'
                    // boxShadow: '2px 0 10px -3px #010101',
                    style={{ border: 'none', padding: '2%', marginTop: '2%', marginBottom: '2%', borderRadius: 30, boxShadow: '0 2px 4px -1px #010101', }}
                >
                    <Typography
                        variant='h3'
                        align='center'
                    >
                        Login Page
                </Typography>
                    <Typography
                        align='center'
                    >
                        <img
                            src={Logo}
                            alt='Logo'
                            style={{ padding: '3% 2% 3% 2%' }}
                        />
                    </Typography>
                    <form
                        onSubmit={(e) => Form_onSubmit(e)}
                    >
                        <TextField
                            variant='outlined'
                            type='text'
                            label='User Name'
                            name='UserName'
                            value={state.UserName}
                            onChange={(e) => Form_onChange(e)}
                            style={{ ...MUI_FullWidth, ...MUI_VerticalMargin }}
                        />
                        <TextField
                            variant='outlined'
                            type={isHidePassword ? 'Password' : 'text'}
                            label='Password'
                            name='Password'
                            value={state.Password}
                            onChange={(e) => Form_onChange(e)}
                            style={{ ...MUI_FullWidth, ...MUI_VerticalMargin }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment
                                        position='end'
                                    >
                                        <IconButton
                                            onClick={() => setHidePassword(!isHidePassword)}
                                            edge='end'
                                        >
                                            {isHidePassword ?
                                                <IoIosEye />
                                                : <IoIosEyeOff />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            type='submit'
                            style={{ ...MUI_FullWidth, ...MUI_VerticalMargin }}
                        >
                            Log In
                    </Button>
                    </form>
                </Paper>
            </Fade>
        </Container>
    )
}

const mapStateToProps = state => ({
    ////// Auth
    isAuth: state.Auth.isAuth,
    token: state.Auth.token,
})

const mapDispatchToProps = dispatch => ({
    Log_In: (UserName, Password) => dispatch(Log_In(UserName, Password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)