import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getPacks, setPacksAttributes } from '../../s2-BLL/packSlice'
import { FilterPanel } from '../FilterPanel/FilterPanel'
import { SuperPagination } from '../Pagination/Pagination'

export const Packs = () => {
  const packs = useAppSelector(state => state.packs.packsData.cardPacks)
  const packsTotalCount = useAppSelector(state => state.packs.packsData.cardPacksTotalCount)
  const attributes = useAppSelector(state => state.packs.attributesData)
  const userId = useAppSelector(state => state.auth.profile._id)
  const dispatch = useAppDispatch()

  const buttonOnClick = () => {
    dispatch(getPacks(attributes))
  }

  useEffect(() => {
    dispatch(getPacks(attributes))
  }, [attributes])

  const showMyPacks = () => {
    dispatch(setPacksAttributes({ attributes: { user_id: userId } }))
  }
  const showAllPacks = () => {
    dispatch(setPacksAttributes({ attributes: { user_id: undefined } }))
  }

  return (
    <>
      <TableContainer component={Paper}>
        <FilterPanel showAllPacks={showAllPacks} showMyPacks={showMyPacks} />
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
            {packs?.map(pack => (
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
        <button onClick={buttonOnClick}>Get packs</button>
      </TableContainer>

      <SuperPagination paginationTitle={'Packs per Page'} />
    </>
  )
}
