import React, { Fragment, useState } from 'react'

// import { connect } from 'react-redux'
// import { Get_User_Id } from '../../Store/Actions/User.Actions'
import { Sort_Integer_Column, Sort_String_Column } from './SortingSystem'

import { Container, Typography, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TableSortLabel, TablePagination, Button } from '@material-ui/core'

import CreateModal from './CreateModal'
// import UserDetail from './Users/UserDetail'

const CreateTable = (props) => {
    const TableId = props.TableId ? props.TableId : null
    const TableHeadData = props.TableHeadData ? props.TableHeadData : null
    const TableBodyData = props.TableBodyData ? props.TableBodyData : null
    const TableContainer = props.TableContainer ? props.TableContainer : false

    const [state, seState] = useState({
        ////// Sorting
        ActiveSorting: null,
        Direction: false,
        ////// Pagination
        RowsPerPage: 10,
        Page: 0,
    })

    const Sorting_Function = (Name, Type, ColumnIndex) => { ////// FIXME Implemented but didn't work on this section. tested and working find in other
        const TypeNumber = 'Number'
        const TypeString = 'String'
        if (Type === TypeNumber) {
            Sort_Integer_Column(TableId, ColumnIndex)
        } else if (Type === TypeString) {
            Sort_String_Column(TableId, ColumnIndex)
        } else {
            console.log('Unspecified Type')
        }
        if (state.ActiveSorting !== Name) {
            seState({ ...state, ActiveSorting: Name, Direction: false })
        } else {
            seState({ ...state, Direction: !state.Direction })
        }
    }

    const handleChangePage = (event, newPage) => {
        seState({ ...state, Page: newPage })
    }
    const handleChangeRowsPerPage = (event) => {
        seState({ ...state, RowsPerPage: parseInt(event.target.value, 10), Page: 0 })
    }


    const ANewTable = () => {
        return (
            <Fragment>
                <Table
                    id={TableId}
                    stickyHeader={props.isTableSticky === false ? false : true}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align='center'
                                width='5%'
                                // style={{ border: '1px solid red' }}
                                onClick={() => null}
                            >
                                <TableSortLabel
                                    active={state.ActiveSorting === 'Index' ? true : false}
                                    direction={state.Direction ? 'asc' : 'desc'}
                                    onClick={() => Sorting_Function('Index', 'Number', 0)}
                                >
                                    index
                            </TableSortLabel>
                            </TableCell>
                            {TableHeadData.map((item, index) => (
                                <TableCell
                                    key={`${TableId}_Head_${index}`}
                                    align='center'
                                    width={item.HeadWidth ? item.HeadWidth : ''}
                                // style={{ border: '1px solid red' }}
                                >
                                    {item.SortType ?
                                        <TableSortLabel
                                            active={state.ActiveSorting === item.Title ? true : false}
                                            direction={state.Direction ? 'asc' : 'desc'}
                                            onClick={() => Sorting_Function(item.Title, item.SortType, index + 1)}
                                        >
                                            {item.Title}
                                        </TableSortLabel>
                                        : `${item.Title}`
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {TableBodyData.slice((state.Page * state.RowsPerPage), ((state.Page * state.RowsPerPage) + state.RowsPerPage)).map((item, index) => (
                            <TableRow
                                hover
                                key={`${TableId}_Body_${index}`}
                            >
                                <TableCell
                                    align='right'
                                    width='5%'
                                // style={{ border: '1px solid red' }}
                                >
                                    {/* {index + 1} */}
                                    {index + 1 + (state.Page * state.RowsPerPage)}
                                </TableCell>
                                {Object.keys(item).map((item_item, index_index) => (
                                    <TableCell
                                        key={`${TableId}_Body_${index}_${index_index}`}
                                        align={TableHeadData[index_index].SortType === 'Number' ? 'right' : 'left'}
                                    // style={{ border: '1px solid red' }}
                                    >
                                        {/* {item_item ? item_item : ''} */}
                                        {item[item_item]}
                                        {/* {(typeof item[item_item] === 'object' && item[item_item] !== null) ? JSON.stringify(item[item_item]) : item[item_item]} */}

                                    </TableCell>
                                ))}
                                {TableHeadData.map((item3, index) => (
                                    item3.Type === 'Button' || item3.Type === 'Modal' ?
                                        <TableCell
                                            key={`${TableId}_Body_Head_${index}`}
                                            align='center'
                                        // style={{ border: '1px solid red' }}
                                        >
                                            {item3.Type === 'Button' ?
                                                <Button
                                                    variant={item3.ButtonVariant ? item3.ButtonVariant : 'outlined'}
                                                    color={item3.ButtonColor ? item3.ButtonColor : 'default'}
                                                    size='medium'
                                                    onClick={() => item3.ButtonOnClick ? item3.ButtonOnClick(item._id) : null}
                                                >
                                                    {item3.Title ? item3.Title : ''}
                                                </Button>

                                                : <CreateModal
                                                    ////// BUTTON 
                                                    ButtonLabel={item3.Title}
                                                    ButtonVariant='outlined'
                                                    ButtonColor={item3.ButtonColor}
                                                    ButtonOnClickEvent={() => item3.ButtonOnClick ? item3.ButtonOnClick(item._id) : null}
                                                    ////// MODAL
                                                    ModalSize={item3.ModalSize}
                                                    ////// Header 
                                                    Header={item3.Title}
                                                    ////// BODY 
                                                    Body={item3.Body}
                                                    ////// FOOTER 
                                                    Footer={item3.Footer}
                                                />
                                            }
                                        </TableCell>
                                        : null
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 50, 100, { label: 'All', value: TableBodyData.length }]}
                                count={TableBodyData.length}
                                rowsPerPage={state.RowsPerPage}
                                page={state.Page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            // ActionsComponent={TablePaginationActions} //custom action
                            >
                            </TablePagination>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Fragment>
        )
    }

    return !TableId || !TableHeadData || !TableBodyData ?
        (
            <Fragment>
                <Typography
                    variant='h2'
                    align='center'
                    color='secondary'
                >
                    Pls input TableId, TableHeadData and TableBodyData
                </Typography>
            </Fragment>
        ) : TableContainer ? (
            <Container>
                <ANewTable />
            </Container>
        ) : (
                <ANewTable />
            )
}

// const mapStateToProps = state => ({
//     ////// Auth
//     // User: state.Auth.User,
//     ////// User
//     // UserId: state.User.UserId,
// })

// const mapDispatchToProps = dispatch => ({
//     Get_User_Id: (UserId) => dispatch(Get_User_Id(UserId)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(CreateTable)
export default CreateTable