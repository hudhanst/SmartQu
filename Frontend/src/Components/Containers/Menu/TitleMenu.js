import React, { Fragment } from 'react'

// import { Link as GoTo } from 'react-router-dom'

import {
    useTheme, Typography,
    Link as GoTo
} from '@material-ui/core'

const TitleMenu = (props) => {
    const isFullScreen = props.isFullScreen ? props.isFullScreen : false

    const Theme = useTheme()
    const ThemeTextPrimary = Theme.palette.text.primary
    return (
        <Fragment>
            <Typography
                variant='h3'
                style={{ border: 'none', fontSize: '3.5vw' }}
            >
                <GoTo
                    href={props.Url ? props.Url : '/PageNotFound'}
                    // to={props.Url ? props.Url : '/PageNotFound'}
                    style={{ textDecoration: 'none', color: ThemeTextPrimary, border: 'none' }}
                >
                    {props.Title ? props.Title : 'Title'}
                </GoTo>
            </Typography>
            {props.Independent || isFullScreen ?
                <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    style={{ fontSize: '1.5vw' }}
                >
                    {props.Description ? props.Description : 'Description'}
                </Typography>
                : null}
        </Fragment>
    )
}

export default TitleMenu