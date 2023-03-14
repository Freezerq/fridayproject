import React, { useEffect } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getCards, setCardsAttributes } from '../../s2-BLL/cardsSlice'
import s from '../FilterPanel/FilterPanel.module.css'

export const Cards = () => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const attributes = useAppSelector(state => state.cards.attributesData)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getCards(attributes))
  }, [isLoggedIn])

  return (
    <>
      <TableContainer component={Paper}>
        <span className={s.text}>Search</span>
        <Paper
          component="form"
          elevation={0}
          sx={{ background: 'transparent' }}
          className={s.paper}
        >
          <SearchIcon color={'disabled'} sx={{ width: '18px', ml: '5px' }} />
          <InputBase
            className={s.input}
            placeholder="Search by question"
            inputProps={{ 'aria-label': 'search by question' }}
            //onChange={handleChange}
            //value={value}
          />
        </Paper>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: '#EFEFEF' }}>
            <TableRow>
              <TableCell align="left">Question</TableCell>
              <TableCell align="left">Answer</TableCell>
              <TableCell align="left">Last updated</TableCell>
              <TableCell align="left">Grade</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards?.map(card => (
              <TableRow key={card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {card.question}
                </TableCell>
                <TableCell align="left">{card.answer}</TableCell>
                <TableCell align="left">updated</TableCell>
                <TableCell align="left">{card.grade}</TableCell>
                <TableCell align="left">-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/*<button onClick={buttonOnClick}>Get cards</button>*/}
      </TableContainer>
      {/*<SuperPagination paginationTitle={'Packs per Page'} setPacksPerPage={setPacksPerPage} />*/}
    </>
  )
}
