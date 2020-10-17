import React, { useEffect, useState, Fragment } from 'react'

import { connect } from 'react-redux'
import { Base_URL } from '../../../Store/Actions/Auth.Actions'
import { Load_Profile, Update_User } from '../../../Store/Actions/User.Actions'

import { useTheme, Avatar, Badge, TextField, FormGroup, FormLabel, Checkbox, Switch, Button, CircularProgress, IconButton, Typography } from '@material-ui/core'
import { MUI_VerticalMargin } from '../../../MUI'

import { IoIosCamera } from 'react-icons/io'

import { DataNotFound } from '../SomethingWrong'
// import LoadingPage from '../LoadingPage'

const UserUpdate = (props) => {
    const [state, setState] = useState({
        UserName: '',
        Name: '',
        isChangePassword: false,
        Password: '',
        ConfirmPassword: '',
        isActive: false,
        isAdmin: false,
        isSuperUser: false,
        ProfilePicture: null,
    })

    useEffect(() => {
        const UserId = props.UserId ? props.UserId : null
        const Profile = props.Profile ? props.Profile : null
        if (UserId) {
            props.Load_Profile(UserId)
        }
        if (Profile) {
            setState({
                ...state,
                UserName: Profile.UserName,
                Name: Profile.Name,
                isActive: Profile.isActive,
                isAdmin: Profile.isAdmin,
                isSuperUser: Profile.isSuperUser,
                // ProfilePicture: Profile.ProfilePicture,
            })
        }
        // eslint-disable-next-line
    }, [props.UserId, props.Profile?._id ? props.Profile._id : false])

    const Profile = props.Profile ? props.Profile : null

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
        if ((state.isChangePassword && state.ConfirmPassword && state.ConfirmPassword === state.Password) || !state.isChangePassword) {
            props.Update_User(Profile._id, state, props.User)
        }
    }

    const Theme = useTheme()
    const ReadOnlyField = Theme.custom.ReadOnlyField
    const ThemePrimaryMain = Theme.palette.primary.main
    // const ThemeSecondaryMain = Theme.palette.secondary.main
    const ThemeSuccess = Theme.palette.success.main

    const isUserSuperUser = props?.User?.isSuperUser ? true : false

    const DefaultUrl = Base_URL()

    const TextFieldStyle = { ...MUI_VerticalMargin, width: '95%', borderRadius: 10 }

    return props.isComponentLoading ?
        // <LoadingPage />
        null
        : (
            <Fragment>
                {Profile ? (
                    <form
                        onSubmit={Form_onSubmit}
                    >
                        <center>

                            <Badge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent={
                                    <Avatar
                                    >
                                        <IconButton
                                            variant="text"
                                            component="label"
                                            style={{ color: ThemePrimaryMain }}
                                        >
                                            <IoIosCamera />
                                            <input
                                                type='file'
                                                accept='image/*'
                                                name='ProfilePicture'
                                                onChange={File_onChange}
                                                style={{ display: "none" }}
                                            />
                                        </IconButton>
                                    </Avatar>
                                }
                            >
                                <Avatar
                                    alt='Profile Picture'
                                    src={state.ProfilePicture ?
                                        URL.createObjectURL(state.ProfilePicture)
                                        : Profile.ProfilePicture ?
                                            `${DefaultUrl}${Profile.ProfilePicture}`
                                            : null}
                                    style={{ ...MUI_VerticalMargin, width: '14vw', height: '24vh', marginTop: '2%', position: 'relative', zIndex: 1 }}
                                />
                            </Badge>

                            <TextField
                                variant='outlined'
                                label='User Name'
                                disabled
                                InputProps={{ readOnly: true }}
                                // name='UserName'
                                // onChange={Form_onChange}
                                value={state.UserName}
                                style={{ ...TextFieldStyle, backgroundColor: ReadOnlyField }}
                            />
                            <TextField
                                variant='outlined'
                                label='Name'
                                name='Name'
                                onChange={Form_onChange}
                                value={state.Name}
                                style={{ ...TextFieldStyle }}
                            />
                        </center>

                        <FormGroup
                            style={{ ...MUI_VerticalMargin }}
                        >
                            <FormLabel>
                                Change a Password?:
                            </FormLabel>
                            <Typography>
                                <Checkbox
                                    size='medium'
                                    color='primary'
                                    name='isChangePassword'
                                    onChange={Switch_onChange}
                                    checked={state.isChangePassword}
                                />
                            </Typography>
                        </FormGroup>

                        {state.isChangePassword ?
                            <center>
                                <TextField
                                    variant='outlined'
                                    label='Password'
                                    name='Password'
                                    type='Password'
                                    onChange={Form_onChange}
                                    value={state.Password}
                                    style={{ ...TextFieldStyle }}
                                />
                                <TextField
                                    variant='outlined'
                                    label='Confirm Password'
                                    name='ConfirmPassword'
                                    type='Password'
                                    onChange={Form_onChange}
                                    value={state.ConfirmPassword}
                                    style={{ ...TextFieldStyle }}
                                />
                            </center>
                            : null}

                        {isUserSuperUser ? (
                            <Fragment>
                                <div
                                    style={{ marginLeft: '3%' }}
                                >
                                    <FormGroup
                                        style={{ ...MUI_VerticalMargin }}
                                    >
                                        <FormLabel>
                                            Active:
                                        </FormLabel>
                                        <Switch
                                            size='medium'
                                            color='primary'
                                            name='isActive'
                                            onChange={Switch_onChange}
                                            checked={state.isActive}
                                        />
                                    </FormGroup>
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
                                            onChange={Switch_onChange}
                                            checked={state.isAdmin}
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
                                            onChange={Switch_onChange}
                                            checked={state.isSuperUser}
                                        />
                                    </FormGroup>
                                </div>
                            </Fragment>)
                            : null}
                        <center>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='large'
                                disabled={props.isActionLoading ? true : false}
                                style={{ ...MUI_VerticalMargin, width: '98%' }}
                            >
                                Update
                            {
                                    props.isActionLoading && <CircularProgress
                                        size={24}
                                        thickness={8}
                                        style={{ color: ThemeSuccess, position: 'absolute' }}
                                    />}
                            </Button>
                        </center>
                    </form>
                )
                    : <DataNotFound />
                }
            </Fragment>
        )
}

const mapStateToProps = state => ({
    ////// General
    isActionLoading: state.General.isActionLoading,
    isComponentLoading: state.General.isComponentLoading,
    ////// Auth
    User: state.Auth.User,
    ////// User
    UserId: state.User.UserId,
    Profile: state.User.Profile,
})

const mapDispatchToProps = dispatch => ({
    Load_Profile: (UserId) => dispatch(Load_Profile(UserId)),
    Update_User: (UserId, UpdateData, AuthData) => dispatch(Update_User(UserId, UpdateData, AuthData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate)