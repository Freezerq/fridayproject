import { useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getPacksTC } from '../../s2-BLL/packSlice'

export const Packs = () => {
  const packs = useAppSelector(state => state.packs.packs)
  const dispatch = useAppDispatch()

  const buttonOnClick = () => {
    dispatch(getPacksTC())
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(9)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Cards</TableCell>
            <TableCell align="left">Last Updated</TableCell>
            <TableCell align="left">Created by</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(pack => (
            <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {pack.name}
              </TableCell>
              <TableCell align="left">{pack.cardsCount}</TableCell>
              <TableCell align="left">{pack.updated}</TableCell>
              <TableCell align="left">{pack.user_name}</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[3, 6, 9]}
        component="div"
        count={packs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <button onClick={buttonOnClick}>Get packs</button>
    </TableContainer>
  )
}
