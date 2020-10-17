import React, { Fragment, useEffect } from 'react'

import { connect } from 'react-redux'

import { Get_User_Id, Load_User_List, Delete_User } from '../../../Store/Actions/User.Actions'
// import { Sort_Integer_Column, Sort_String_Column } from '../../Containers/SortingSystem'

import { useTheme, Button, CircularProgress } from '@material-ui/core'
import { Container, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core' ////// incase create table function i create work without bug remove this line
import { MUI_VerticalMargin } from '../../../MUI'

import TitleMenu from '../../Containers/Menu/TitleMenu'
import CreateModal from '../../Containers/CreateModal'
import UserRegistration from '../../Containers/Users/UserRegistration'
import UserDetail from '../../Containers/Users/UserDetail'
import UserUpdate from '../../Containers/Users/UserUpdate'
// import CreateTable from '../../Containers/CreateTable'
// import LoadingPage from '../../Containers/LoadingPage'

const ManagementUsers = (props) => {
    useEffect(() => {
        props.Load_User_List()
        // eslint-disable-next-line
    }, [])
    const ComponentName = 'ManagementUsers'
    const Data = props.UserList ? props.UserList : []

    const Theme = useTheme()
    const ThemeSuccess = Theme.palette.success.main

    const DeleteFooter = () => {
        const UserAuth = props.User
        const DeletedUserId = props.UserId ? props.UserId : null
        return (
            <center>
                <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    disabled={!DeletedUserId || props.isActionLoading ? true : false}
                    onClick={() => props.Delete_User(DeletedUserId, UserAuth)}
                    style={{ ...MUI_VerticalMargin, width: '98%' }}
                >
                    {DeletedUserId ?
                        'Delete User'
                        : 'User Id Not Found'}
                    {
                        props.isActionLoading && <CircularProgress
                            size={24}
                            thickness={8}
                            style={{ color: ThemeSuccess, position: 'absolute' }}
                        />}
                </Button>
            </center>
        )
    }
    // const HeadData = [
    //     {
    //         Title: 'Id',
    //         SortType: 'String',
    //         HeadWidth: '15%',
    //     },
    //     {
    //         Title: 'User Name',
    //         SortType: 'String',
    //         HeadWidth: '25%',
    //     },
    //     {
    //         Title: 'Name',
    //         SortType: 'String',
    //         HeadWidth: '25%',
    //     },
    //     // {
    //     //     Title: 'View',
    //     //     HeadWidth: '10%',
    //     //     Type: 'Button',
    //     //     ButtonOnClick: console.log,
    //     // },
    //     {
    //         Title: 'View',
    //         HeadWidth: '10%',
    //         Type: 'Modal',
    //         // ButtonOnClick: console.log,
    //         // ButtonOnClick: {f_function: () => console.log()},
    //         ButtonOnClick: props.Get_User_Id,
    //         Header: 'User Detail',
    //         Body: <UserDetail />,
    //     },
    //     {
    //         Title: 'Update',
    //         ButtonColor: 'primary',
    //         HeadWidth: '10%',
    //         Type: 'Modal',
    //         ButtonOnClick: props.Get_User_Id,
    //         Header: 'User Update',
    //         Body: <UserUpdate />,
    //     },
    //     {
    //         Title: 'Delete',
    //         ButtonColor: 'secondary',
    //         HeadWidth: '10%',
    //         Type: 'Modal',
    //         Header: 'Delete User',
    //         ButtonOnClick: props.Get_User_Id,
    //         Body: <UserDetail />,
    //         Footer: <DeleteFooter />,
    //     },
    // ]

    return props.isComponentLoading ?
        // <LoadingPage />
        null
        : (
            <Fragment>
                <center>
                    <TitleMenu
                        Title='Management Users'
                        Url='/management/users'
                    // Independent={true}
                    />
                    <CreateModal
                        ////// BUTTON 
                        ButtonLabel='Add New User'
                        ButtonSize='large'
                        ButtonColor='primary'
                        ButtonOnClickEvent={() => props.Get_User_Id(123)}
                        ButtonStyle={{ ...MUI_VerticalMargin, width: '90%' }}
                        ////// MODAL
                        ModalSize='l'
                        ////// Header 
                        Header='User Registration'
                        ////// BODY 
                        Body={<UserRegistration />}
                    ////// FOOTER 
                    />

                </center>

                {/* <CreateTable
                TableId={ComponentName}
                TableHeadData={HeadData}
                TableBodyData={Data}
                TableContainer={true}
            /> */}


                {/* <hr /> */}


                <Container>
                    <Table
                        id={ComponentName}
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                // onClick={() => Sort_Integer_Column(ComponentName, 0)}
                                >
                                    index
                            </TableCell>
                                <TableCell
                                // onClick={() => Sort_String_Column(ComponentName, 0)}
                                >
                                    Id
                            </TableCell>
                                <TableCell>
                                    User Name
                            </TableCell>
                                <TableCell>
                                    Name
                            </TableCell>
                                <TableCell>
                                    View
                            </TableCell>
                                <TableCell>
                                    Update
                            </TableCell>
                                <TableCell>
                                    Delete
                            </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Data.map((item, index) => (
                                <TableRow
                                    key={index}
                                    hover
                                >
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {item._id}
                                    </TableCell>
                                    <TableCell>
                                        {item.UserName}
                                    </TableCell>
                                    <TableCell>
                                        {item.Name}
                                    </TableCell>
                                    <TableCell>
                                        <CreateModal
                                            ////// BUTTON 
                                            ButtonLabel='View'
                                            ButtonVariant='outlined'
                                            ButtonColor='default'
                                            ButtonOnClickEvent={() => props.Get_User_Id(item._id)}
                                            ////// MODAL
                                            ModalSize='l'
                                            ////// Header 
                                            Header='View'
                                            ////// BODY 
                                            Body={<UserDetail />}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <CreateModal
                                            ////// BUTTON 
                                            ButtonLabel='Update'
                                            ButtonVariant='outlined'
                                            ButtonColor='primary'
                                            ButtonOnClickEvent={() => props.Get_User_Id(item._id)}
                                            ////// MODAL
                                            ModalSize='l'
                                            ////// Header 
                                            Header='Update'
                                            ////// BODY 
                                            Body={<UserUpdate />}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <CreateModal
                                            ////// BUTTON 
                                            ButtonLabel='Delete'
                                            ButtonVariant='outlined'
                                            ButtonColor='secondary'
                                            ButtonOnClickEvent={() => props.Get_User_Id(item._id)}
                                            ////// MODAL
                                            ModalSize='l'
                                            ////// Header 
                                            Header='Delete'
                                            ////// BODY 
                                            Body={<UserDetail />}
                                            ////// FOOTER 
                                            Footer={<DeleteFooter />}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            </Fragment>
        )
}

const mapStateToProps = state => ({
    ////// General
    isActionLoading: state.General.isActionLoading,
    isComponentLoading: state.General.isComponentLoading,
    ////// Auth
    User: state.Auth.User,
    ////// User
    UserId: state.User.UserId,
    UserList: state.User.UserList,
})

const mapDispatchToProps = dispatch => ({
    Get_User_Id: (UserId) => dispatch(Get_User_Id(UserId)),
    Load_User_List: () => dispatch(Load_User_List()),
    Delete_User: (DeletedUserId, UserAuth) => dispatch(Delete_User(DeletedUserId, UserAuth)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagementUsers)