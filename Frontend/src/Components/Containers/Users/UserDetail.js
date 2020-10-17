import React, { useEffect, Fragment } from 'react'

import { connect } from 'react-redux'
import { Base_URL } from '../../../Store/Actions/Auth.Actions'
import { Load_Profile } from '../../../Store/Actions/User.Actions'

import { useTheme, Avatar, TextField, Switch, FormGroup, FormLabel, } from '@material-ui/core'
import { MUI_VerticalMargin } from '../../../MUI'

import { DataNotFound } from '../SomethingWrong'
// import LoadingPage from '../LoadingPage'

const UserDetail = (props) => {
    useEffect(() => {
        const UserId = props.UserId ? props.UserId : null
        if (UserId) {
            props.Load_Profile(UserId)
        }
        // eslint-disable-next-line
    }, [props.UserId])

    const Theme = useTheme()
    const ReadOnlyField = Theme.custom.ReadOnlyField
    const ThemePrimaryMain = Theme.palette.primary.main
    const ThemeSecondaryMain = Theme.palette.secondary.main

    const isUserSuperUser = props?.User?.isSuperUser ? true : false
    const Profile = props.Profile ? props.Profile : null
    const DefaultUrl = Base_URL()

    const TextFieldStyle = { ...MUI_VerticalMargin, width: '95%', backgroundColor: ReadOnlyField, borderRadius: 10 }

    return props.isComponentLoading ?
        // <LoadingPage />
        null
        : (
            <Fragment>
                {Profile ? (
                    <Fragment>
                        <center>
                            <Avatar
                                alt='Profile Picture'
                                src={Profile.ProfilePicture ? `${DefaultUrl}${Profile.ProfilePicture}` : null}
                                style={{ ...MUI_VerticalMargin, width: '14vw', height: '24vh', marginTop: '2%' }}
                            />
                            <TextField
                                variant='outlined'
                                label='User Name'
                                disabled
                                InputProps={{ readOnly: true, }}
                                value={Profile.UserName ? Profile.UserName : ''}
                                style={{ ...TextFieldStyle }}
                            />
                            <TextField
                                variant='outlined'
                                label='Name'
                                disabled
                                InputProps={{ readOnly: true, }}
                                value={Profile.Name ? Profile.Name : ''}
                                style={{ ...TextFieldStyle }}
                            />
                        </center>

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
                                            disabled
                                            checked={Profile.isActive ? Profile.isActive : false}
                                            style={{ color: Profile.isActive ? ThemePrimaryMain : ThemeSecondaryMain }}
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
                                            disabled
                                            checked={Profile.isAdmin ? Profile.isAdmin : false}
                                            style={{ color: Profile.isAdmin ? ThemePrimaryMain : ThemeSecondaryMain }}
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
                                            disabled
                                            checked={Profile.isSuperUser ? Profile.isSuperUser : false}
                                            style={{ color: Profile.isSuperUser ? ThemePrimaryMain : ThemeSecondaryMain }}
                                        />
                                    </FormGroup>
                                </div>
                                <center>
                                    <TextField
                                        variant='outlined'
                                        label='Register Date'
                                        disabled
                                        InputProps={{ readOnly: true, }}
                                        value={Profile.RegisterDate ? new Date(Profile.RegisterDate).toLocaleString() : ''}
                                        style={{ ...TextFieldStyle }}
                                    />
                                    <TextField
                                        variant='outlined'
                                        label='Last Active'
                                        disabled
                                        InputProps={{ readOnly: true, }}
                                        value={Profile.LastActive ? new Date(Profile.LastActive).toLocaleString() : ''}
                                        style={{ ...TextFieldStyle }}
                                    />
                                </center>
                            </Fragment>)
                            : null}
                    </Fragment>
                )
                    : <DataNotFound />
                }
            </Fragment>
        )
}

const mapStateToProps = state => ({
    ////// General
    isComponentLoading: state.General.isComponentLoading,
    ////// Auth
    User: state.Auth.User,
    ////// User
    UserId: state.User.UserId,
    Profile: state.User.Profile,
})

const mapDispatchToProps = dispatch => ({
    Load_Profile: (UserId) => dispatch(Load_Profile(UserId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)