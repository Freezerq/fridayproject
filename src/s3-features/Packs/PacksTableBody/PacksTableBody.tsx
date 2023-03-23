import React from 'react'

import { Skeleton } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../s1-DAL/store'
import { appStatusSelector } from '../../../s4-common/selectors/appSelectors'
import { packsSelector } from '../../../s4-common/selectors/packsSelectors'
import { ActionsForPacks } from '../../Actions/ActionsForPacks'
import { PATH } from '../../Routes/AppRoutes'

export const PacksTableBody = (props: PacksTableBodyType) => {
  const packs = useAppSelector(packsSelector)
  const appStatus = useAppSelector(appStatusSelector)

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
            <ActionsForPacks pack={pack} onDeletePackHandle={props.onDeletePackHandle} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

type PacksTableBodyType = {
  onDeletePackHandle: (id: string) => void
}
