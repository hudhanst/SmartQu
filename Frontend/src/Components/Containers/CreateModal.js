import React, { Fragment, useState } from 'react'

import { useTheme, Paper, Typography, IconButton, Modal, Button } from '@material-ui/core'

import { IoIosClose } from 'react-icons/io'

const CreateModal = (props) => {
    const [isModalOpen, setModalStatus] = useState(false)
    const handleOpen = () => {
        if (props.ButtonOnClickEvent !== null && props.ButtonOnClickEvent !== undefined) {
            props.ButtonOnClickEvent() ////// FIXME if ButtonOnClick === Redux.Action need to double click to open Modal
        }
        setModalStatus(true)
    }
    const Header = (
        <Fragment>
            <Typography
                variant='h6'
                align='right'
            >
                <IconButton
                    onClick={() => setModalStatus(false)}
                >
                    <IoIosClose />
                </IconButton>
            </Typography>
            <Typography
                variant='h4'
                color={props.Header ? 'textPrimary' : 'secondary'}
                align='left'
            >
                {props.Header ? props.Header : 'Pls Insert a Header'}
            </Typography>
        </Fragment>
    )
    const Body = (
        <Fragment>
            {props.Body ?
                props.Body
                : <Typography
                    variant='h3'
                    color="secondary"
                >
                    Pls Insert a Body
                </Typography>
            }
        </Fragment>
    )
    const Footer = (
        <Fragment>
            {props.Footer ?
                <Fragment>
                    <hr />
                    {props.Footer}
                </Fragment>
                : null
            }
        </Fragment>
    )
    const Theme = useTheme()
    const ModalSize = (props.ModalSize === 'xl') ? 90 :
        (props.ModalSize === 'l') ? 80 :
            (props.ModalSize === 'm') ? 60 : 40
    return (
        <Fragment>
            <Button
                type={props.ButtonType ? props.ButtonType : ''}
                disabled={props.ButtonDisabled ? props.ButtonDisabled : false}
                variant={props.ButtonVariant ? props.ButtonVariant : 'contained'}
                color={props.ButtonColor ? props.ButtonColor : 'default'}
                size={props.ButtonSize ? props.ButtonSize : 'medium'}
                onClick={() => handleOpen()}
                // onClick={() => { handleOpen(); setModalStatus(true); }}
                style={props.ButtonStyle ? props.ButtonStyle : {}}
            >
                {props.ButtonLabel ? props.ButtonLabel : 'Modal'}
            </Button>

            <Modal
                open={isModalOpen}
                onClose={() => setModalStatus(false)}
                style={{ overflow: 'auto', display: 'block' }}
            >
                <Paper
                    variant='elevation'
                    style={{
                        position: 'absolute',
                        width: props.UnControlSize === true ? null : `${ModalSize}%`,
                        minWidth: props.UnControlSize === true ? `${ModalSize}%` : null,
                        marginLeft: `${(100 - ModalSize) / 2}%`,
                        marginRight: `${(100 - ModalSize) / 2}%`,
                        marginTop: 15,
                        marginBottom: 10,
                        padding: Theme.spacing(2, 4, 3),
                        // padding: '0 2% 2% 2%',
                        border: '2px solid #000',
                        boxShadow: Theme.shadows[5],
                    }}
                >
                    {Header}
                    <hr />
                    {Body}
                    {Footer}

                </Paper>
            </Modal>
        </Fragment>
    )
}

export default CreateModal