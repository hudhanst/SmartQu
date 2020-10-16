import React, { Fragment } from 'react'

import { Typography, Button } from '@material-ui/core'

import Logo from '../../IMG/Logo.png'

export const PageNotFound = (props) => {
    const BackButton = () => {
        window.history.back()
    }
    const HomeButton = () => {
        window.location = "/"
    }
    return (
        <Fragment>
            <Typography
                align='center'
                style={{ marginTop: '1vh', padding: '10px' }}
            >
                <img
                    src={Logo}
                    alt='Logo'
                    onClick={() => HomeButton()}
                />
            </Typography>
            <Typography
                variant='h2'
                align='center'
            >
                Page Not Found
        </Typography>
            <Typography
                variant='subtitle1'
                align='center'
            >
                Click button below to back or click on logo to Home page
        </Typography>
            <Typography
                align='center'
            >
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => BackButton()}
                    style={{ padding: '10px', marginTop: '10px' }}
                >
                    Back!
            </Button>
            </Typography>
            {props.ket ?
                <Typography
                    variant='h6'
                    align='center'
                >
                    {props.ket}
                </Typography>
                : null
            }
        </Fragment>
    )
}

export const SomethingWrong = (props) => {
    return (
        <Fragment>
            <Typography
                align='center'
                style={{ marginTop: '1vh', padding: '10px' }}
            >
                <img
                    src={Logo}
                    alt='Logo'
                />
            </Typography>
            <Typography
                variant='h2'
                align='center'
            >
                Some thing wrong happened
        </Typography>
            <Typography
                variant='subtitle1'
                align='center'
            >
                Some thing wrong happened, page maybe broken or under maintenance
        </Typography>
            {props.ket ?
                <Typography
                    variant='h6'
                    align='center'
                >
                    {props.ket}
                </Typography>
                : null
            }
        </Fragment>
    )
}

export const DataNotFound = (props) => {
    return (
        <Fragment>
            <Typography
                align='center'
                style={{ marginTop: '1vh', padding: '10px' }}
            >
                <img
                    src={Logo}
                    alt='Logo'
                />
            </Typography>
            <Typography
                variant='h2'
                align='center'
            >
                Some thing wrong with the data
        </Typography>
            <Typography
                variant='subtitle1'
                align='center'
            >
                Some thing wrong happened, we cant get data you try to access
        </Typography>
            {props.ket ?
                <Typography
                    variant='h6'
                    align='center'
                >
                    {props.ket}
                </Typography>
                : null
            }
        </Fragment>
    )
}