import React, { Fragment } from 'react'

// import { Link as GoTo } from 'react-router-dom'

import {
    useTheme, List, ListItem, ListItemIcon, ListItemText,
    Link as GoTo
} from '@material-ui/core'

const ListMenu = (props) => {
    const Theme = useTheme()
    const ThemeTextPrimary = Theme.palette.text.primary
    const ThemeBackgroundPaper = Theme.palette.background.paper

    return (
        <Fragment>
            <List
                style={{ border: 'none', width: '100%' }}
            >
                <GoTo
                    href={props.Url ? props.Url : '/PageNotFound'}
                    // to={props.Url ? props.Url : '/PageNotFound'}
                    style={{ textDecoration: 'none', color: ThemeTextPrimary }}
                >
                    <ListItem
                        style={{ border: 'none', backgroundColor: ThemeBackgroundPaper }}
                    >
                        <ListItemIcon>
                            {props.Icon ? props.Icon : 'Icon'}
                        </ListItemIcon>
                        <ListItemText primary={props.Title ? props.Title : 'Title'} />
                    </ListItem>
                </GoTo>
            </List>
        </Fragment>
    )
}

export default ListMenu