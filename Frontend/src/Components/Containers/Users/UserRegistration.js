import React, { Fragment, useState } from 'react'

import { connect } from 'react-redux'
import { Register_New_User } from '../../../Store/Actions/User.Actions'

import { Typography, TextField, FormGroup, FormLabel, Switch, Button } from '@material-ui/core'
import { MUI_VerticalMargin } from '../../../MUI'

const UserRegistration = (props) => {
    const [state, setState] = useState({
        UserName: '',
        Name: '',
        Password: '',
        ConfirmPassword: '',
        isAdmin: true,
        isSuperUser: false,
        ProfilePicture: null,
    })

    const Form_onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const Switch_onChange = (e) => {
        setState({ ...state, [e.target.name]: !state[e.target.name] })
    }

    const File_onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.files[0] })
    }

    const Form_onSubmit = (e) => {
        e.preventDefault()
        if (state.ConfirmPassword && state.ConfirmPassword === state.Password) {
            props.Register_New_User(state, props.User)
        }
    }

    const TextFieldStyle = { ...MUI_VerticalMargin, width: '95%', borderRadius: 10 }

    return (
        <Fragment>
            <Typography
                variant='h3'
                align='center'
            >
                User Registration
            </Typography>

            <form
                onSubmit={Form_onSubmit}
            >
                <center>
                    <TextField
                        variant='outlined'
                        label='User Name'
                        type='text'
                        name='UserName'
                        value={state.UserName}
                        onChange={(e) => Form_onChange(e)}
                        style={{ ...TextFieldStyle }}
                        required
                    />
                    <TextField
                        variant='outlined'
                        label='Name'
                        type='text'
                        name='Name'
                        value={state.Name}
                        onChange={(e) => Form_onChange(e)}
                        style={{ ...TextFieldStyle }}
                        required
                    />

                    <TextField
                        variant='outlined'
                        label='Password'
                        type='Password'
                        name='Password'
                        value={state.Password}
                        onChange={(e) => Form_onChange(e)}
                        style={{ ...TextFieldStyle }}
                        required
                    />

                    <TextField
                        variant='outlined'
                        label='Confirm Password'
                        type='Password'
                        name='ConfirmPassword'
                        value={state.ConfirmPassword}
                        onChange={(e) => Form_onChange(e)}
                        style={{ ...TextFieldStyle }}
                        error={state.ConfirmPassword && (state.ConfirmPassword !== state.Password) ? true : false}
                        helperText={state.ConfirmPassword && (state.ConfirmPassword !== state.Password) ? 'Password and ConfirmPassword must same' : null}

                    />
                </center>

                <div
                    style={{ marginLeft: '3%' }}
                >
                    <FormGroup
                        style={{ ...MUI_VerticalMargin }}
                    >
                        <FormLabel>
                            Admin:
                        </FormLabel>
                        <Switch
                            size='medium'
                            color='primary'
                            name='isAdmin'
                            checked={state.isAdmin}
                            onChange={(e) => Switch_onChange(e)}
                        />
                    </FormGroup>
                    <FormGroup
                        style={{ ...MUI_VerticalMargin }}
                    >
                        <FormLabel>
                            SuperUser:
                        </FormLabel>
                        <Switch
                            size='medium'
                            color='primary'
                            name='isSuperUser'
                            checked={state.isSuperUser}
                            onChange={(e) => Switch_onChange(e)}
                        />
                    </FormGroup>
                    <label>
                        Photo Profile:
                    </label>
                    <br />
                    <input
                        type='file'
                        accept='image/*'
                        name='ProfilePicture'
                        onChange={File_onChange}
                    />
                    <br />
                    <center>
                        <img
                            alt='Upload Preview'
                            src={state.ProfilePicture ? URL.createObjectURL(state.ProfilePicture) : null}
                            style={{ ...MUI_VerticalMargin, border: 'none', minWidth: '20vw', minHeight: '20vw', boxShadow: '0 2px 4px -1px #010101' }}
                        />
                    </center>

                </div>

                {/* <Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        style={{ display: "none" }}
                    />
                </Button> */}

                <center>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                        style={{ ...MUI_VerticalMargin, width: '98%' }}
                    >
                        Register a New User
                </Button>
                </center>
            </form>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    ////// Auth
    User: state.Auth.User,
})

const mapDispatchToProps = dispatch => ({
    Register_New_User: (UserData, AuthData) => dispatch(Register_New_User(UserData, AuthData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration)