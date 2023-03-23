import React from 'react'

import { Skeleton } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { UpdatePackType } from '../../../s1-DAL/packsAPI'
import { useAppSelector } from '../../../s1-DAL/store'
import { ActionsForPack } from '../../Actions/ActionsForPack'
import { PATH } from '../../Routes/AppRoutes'

export const PacksTableBody = (props: PacksTableBodyType) => {
  const packs = useAppSelector(state => state.packs.packsData.cardPacks)
  const appStatus = useAppSelector(state => state.app.status)
  const navigate = useNavigate()
  const onNameClickHandler = (id: string) => {
    navigate(PATH.CARDS + `?cardsPack_id=${id}`)
  }

  return (
    <TableBody>
      {packs?.map(pack => (
        <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell
            style={{ backgroundColor: 'gray' }}
            onClick={() => onNameClickHandler(pack._id)}
            component="th"
            scope="row"
          >
            {appStatus === 'loading' ? <Skeleton /> : pack.name}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton /> : pack.cardsCount}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton /> : pack.updated.substring(0, 10)}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton /> : pack.user_name}
          </TableCell>
          <TableCell align="left">
            <ActionsForPack
              packName={pack.name}
              packId={pack._id}
              id={pack.user_id}
              totalCardsInPack={pack.cardsCount}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

type PacksTableBodyType = {
  onDeletePackHandle: (id: string) => void
  onEditPackHandle: (data: UpdatePackType) => void
}
