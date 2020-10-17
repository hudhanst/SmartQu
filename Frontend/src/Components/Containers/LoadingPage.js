import React, { } from 'react'

import { Container, CircularProgress } from '@material-ui/core'

import { MUI_VerticalMargin } from '../../MUI'

const LoadingPage = (props) => { ////// TODO FIXME Reloading multiple time because of same parameter
    return (
        <Container>
            <center>
                <CircularProgress
                    size={400}
                    thickness={30}
                    color='primary'
                    style={{ ...MUI_VerticalMargin }}
                />
            </center>
        </Container>
    )
}

export default LoadingPage