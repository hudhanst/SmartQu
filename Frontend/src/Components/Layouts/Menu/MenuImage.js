import React, { Fragment } from 'react'

import { useMediaQuery, Grid } from '@material-ui/core'
import { MUI_Initial_State } from '../../../MUI'

import { Cek_Privacy_Access, Some_Major_Menu_Data } from '../../../Store/DataBases/Menu.DataBases'

import TitleMenu from '../../Containers/Menu/TitleMenu'
import PaperMenu from '../../Containers/Menu/PaperMenu'
import ListMenu from '../../Containers/Menu/ListMenu'
import { SomethingWrong } from '../../Containers/SomethingWrong'

const MenuImage = (props) => {
    const MenuTitle = 'Image'
    const MenuData = Some_Major_Menu_Data(MenuTitle)

    const MenuUrl = MenuData.Url ? MenuData.Url : null
    const MenuDescription = MenuData.Description ? MenuData.Description : null
    const MenuList = MenuData.MenuList ? MenuData.MenuList : []

    const minScreenWidth = MUI_Initial_State.units.minWidth_first
    const isFullScreen = useMediaQuery(`(min-width:${minScreenWidth}px)`)

    return MenuData ? (
        <Fragment>
            <center>
                <TitleMenu
                    Url={MenuUrl}
                    Title={MenuTitle}
                    Independent={true}
                    Description={MenuDescription}
                />
            </center>
            <Grid
                container
                direction={isFullScreen ? 'row' : 'column'}
                justify="center"
                alignItems="center"
            >
                {
                    MenuList.map((item, index) => (
                        Cek_Privacy_Access(item.PrivacyType) ?
                            <Fragment
                                key={`MenuData${MenuTitle}_${index}`}
                            >
                                {isFullScreen ?
                                    <PaperMenu
                                        Url={item.Url ? item.Url : ''}
                                        Icon={item.Icon ? item.Icon : null}
                                        Title={item.Title ? item.Title : ''}
                                        AdditionalStyle={{}}
                                        isDisableAnimation={false}
                                    />
                                    : <ListMenu
                                        Url={item.Url ? item.Url : ''}
                                        Icon={item.Icon ? item.Icon : null}
                                        Title={item.Title ? item.Title : ''}
                                    />
                                }
                            </Fragment>
                            : null
                    ))
                }
            </Grid>
        </Fragment>
    ) : <SomethingWrong />
}

export default MenuImage