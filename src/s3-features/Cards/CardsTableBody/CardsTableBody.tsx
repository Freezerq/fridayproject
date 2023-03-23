import React from 'react'

import { Skeleton } from '@mui/material'
import Rating from '@mui/material/Rating/Rating'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../../s1-DAL/store'
import { ActionsForCards } from '../../Actions/ActionsForCards'

export const CardsTableBody = () => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const appStatus = useAppSelector(state => state.app.status)
  const userId = useAppSelector(state => state.auth.profile._id)
  const onStudyClick = () => {
    console.log('study')
  }

  return (
    <TableBody>
      {cards?.map(card => (
        <TableRow key={card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {appStatus === 'loading' ? <Skeleton /> : card.question}
          </TableCell>
          <TableCell align="left">{appStatus === 'loading' ? <Skeleton /> : card.answer}</TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton /> : card.updated.substring(0, 10)}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? (
              <Skeleton />
            ) : (
              <Rating name="size-medium" value={card.grade} />
            )}
          </TableCell>
          {card.user_id === userId && (
            <TableCell align="left">
              <ActionsForCards card={card} onStudyClick={onStudyClick} />
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
