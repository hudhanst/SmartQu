import React, { } from 'react'

import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router-dom'

import { Cek_Privacy_Access } from '../Store/DataBases/Menu.DataBases'

const PrivateRoute = ({ component: Component, Auth, SecurityType, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (Auth.isAuthLoading) {
                return (
                    <center>
                        <h2>
                            Loading
                        </h2>
                    </center>
                )
            } else if (!Auth.isAuth) {
                ////// dispatch 401 error messages
                console.log(401)
                return <Redirect
                    to='/login'
                />
            } else {
                const User = Auth.User
                if (User) {
                    const isAllowed = Cek_Privacy_Access(SecurityType ? SecurityType : null)
                    if (isAllowed) {
                        ////// 200 code
                        return <Component
                            {...props}
                        />
                    } else {
                        ////// dispatch 403 error messages
                        console.log(403)
                        return <Redirect
                            to='/login'
                        />
                    }
                }
                // if (Auth.User) {
                //     const isAllowed = Cek_Privacy_Access(SecurityType ? SecurityType : null)
                //     if (isAllowed) {
                //         ////// 200 code
                //         return <Component
                //             {...props}
                //         />
                //     } else {
                //         ////// dispatch 403 error messages
                //         console.log(403)
                //         return <Redirect
                //             to='/login'
                //         />
                //     }
                // } else {
                //     ////// dispatch 401 error messages
                //     console.log(2)
                //     console.log(401)
                //     return <Redirect
                //         to='/login'
                //     />
                // }
            }
        }}
    />
)

const mapStateToProps = state => ({
    ////// Auth
    Auth: state.Auth,
    // User: state.Auth.User,
})

const mapDispatchToProps = dispatch => ({
    // function: (InputData) => dispatch(function(InputData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)