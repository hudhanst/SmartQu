import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { useMediaQuery, Container, Grid, Fade } from '@material-ui/core'
import { MUI_Initial_State, MUI_VerticalMargin } from '../../MUI'

import { Cek_Privacy_Access, Major_Menu_Data } from '../../Store/DataBases/Menu.DataBases'
import TitleMenu from '../Containers/Menu/TitleMenu'
import PaperMenu from '../Containers/Menu/PaperMenu'
import ListMenu from '../Containers/Menu/ListMenu'


const MainMenu = (props) => {
    const MenuData = Major_Menu_Data()

    const minScreenWidth = MUI_Initial_State.units.minWidth_first
    const isFullScreen = useMediaQuery(`(min-width:${minScreenWidth}px)`)
    // const isFullScreen = false

    return (
        <Container>
            <center>
                <TitleMenu
                    Url={MenuData[MenuData.length - 1].Url}
                    Title='Main Menu'
                    Animated={true}
                />
            </center>

            {MenuData.map((item, index) => (
                <div
                    key={`MenuData${index}`}
                    style={{ ...MUI_VerticalMargin }}
                >
                    {(index > 0 && index < MenuData.length - 1) ?
                        Cek_Privacy_Access(item.PrivacyType) ?
                            <Fragment>
                                <Fade
                                    in={true}
                                    timeout={700 + (200 * index)}
                                >
                                    <TitleMenu
                                        isFullScreen={isFullScreen}
                                        Title={item.Title ? item.Title : null}
                                        Url={item.Url ? item.Url : null}
                                        Description={item.Description ? item.Description : null}
                                        Animated={true}
                                    />
                                </Fade>

                                {
                                    item.MenuList ?
                                        <Fragment>
                                            <Grid
                                                container
                                                direction={isFullScreen ? 'row' : 'column'}
                                                justify="center"
                                                alignItems="center"
                                            >
                                                {
                                                    item.MenuList.map((item_item, index_index) => (
                                                        Cek_Privacy_Access(item_item.PrivacyType ? item_item.PrivacyType : null) ?
                                                            <Fragment
                                                                key={`MenuData${index}_${index_index}`}
                                                            >
                                                                {isFullScreen ?
                                                                    <PaperMenu
                                                                        Url={item_item.Url ? item_item.Url : ''}
                                                                        Icon={item_item.Icon ? item_item.Icon : null}
                                                                        Title={item_item.Title ? item_item.Title : ''}
                                                                        AdditionalStyle={{}}
                                                                        isDisableAnimation={false}
                                                                    />
                                                                    : <ListMenu
                                                                        Url={item_item.Url ? item_item.Url : ''}
                                                                        Icon={item_item.Icon ? item_item.Icon : null}
                                                                        Title={item_item.Title ? item_item.Title : ''}
                                                                    />
                                                                }
                                                            </Fragment>
                                                            : null
                                                    ))
                                                }
                                            </Grid>
                                        </Fragment>
                                        : null
                                }
                            </Fragment>
                            : null
                        : null}
                </div>
            ))}

        </Container>
    )
}

const mapStateToProps = state => ({
    ////// Auth
    // User: state.Auth.User,
})

const mapDispatchToProps = dispatch => ({
    // function: (InputData) => dispatch(function(InputData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)