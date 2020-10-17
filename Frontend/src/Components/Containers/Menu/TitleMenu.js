import React, { Fragment } from 'react'

// import { Link as GoTo } from 'react-router-dom'

import {
    useTheme, Typography, Fade,
    Link as GoTo
} from '@material-ui/core'

const TitleMenu = (props) => {
    const isFullScreen = props.isFullScreen ? props.isFullScreen : false

    const Theme = useTheme()
    const ThemeTextPrimary = Theme.palette.text.primary
    return (
        <Fragment>
            <Fade
                in={true}
                timeout={props.Animated ? 700 : 0}
            >
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
            </Fade>
            {props.Independent || isFullScreen ?
                <Fade
                    in={true}
                    timeout={props.Animated ? 1000 : 0}
                >
                    <Typography
                        variant='subtitle1'
                        color='textSecondary'
                        style={{ fontSize: '1.5vw' }}
                    >
                        {props.Description ? props.Description : 'Description'}
                    </Typography>
                </Fade>
                : null}
        </Fragment>
    )
}

export default TitleMenu