import React, { useEffect } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating/Rating'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getCards } from '../../s2-BLL/cardsSlice'
import { SearchField } from '../../s4-components/common/SearchField/SearchField'
import { SuperButton } from '../../s4-components/common/SuperButton/SuperButton'
import { ActionsForCards } from '../Actions/ActionsForCards'
import { ActionsForPacks } from '../Actions/ActionsForPacks'
import { PATH } from '../Routes/AppRoutes'

import s from './Cards.module.scss'
import { CardsTableHead } from './CardsTableHead'

export const Cards = () => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const cardsData = useAppSelector(state => state.cards.cardsData)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  //set params into URL
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  //get Single Params From URL
  const searchValue = searchParams.get('')
  const sortCards = searchParams.get('sortCards')
  //to get params from URL after Question Mark
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  useEffect(() => {
    if (!isLoggedIn) return
    const cardsPackId = searchParams.get('cardsPack_id')

    dispatch(getCards({ ...paramsFromUrl, cardsPack_id: cardsPackId }))
  }, [searchParams, isLoggedIn])

  const onSearchNameDebounce = (value: string) => {
    setSearchParams({ ...paramsFromUrl, cardQuestion: value })
  }
  const setSortCards = (sortCards: string) => {
    setSearchParams({
      ...paramsFromUrl,
      sortCards,
    })
  }

  const onStudyClick = () => {
    console.log('study')
  }

  const buttonBackOnClick = () => {
    navigate(PATH.PACKS)
  }

  return (
    <>
      <div style={{ display: 'flex', margin: '15px', alignItems: 'center' }}>
        <ArrowBackIcon onClick={buttonBackOnClick} />
        <span>Back to Packs List</span>
      </div>
      <TableContainer component={Paper}>
        <SearchField
          onSearchName={onSearchNameDebounce}
          searchValue={searchValue ?? ''}
          searchParams={searchParams}
        />

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CardsTableHead setSort={setSortCards} sort={sortCards ?? '0updated'} />
          <TableBody>
            {cards?.length > 0 ? (
              cards?.map(card => (
                <TableRow key={card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {card.question}
                  </TableCell>
                  <TableCell align="left">{card.answer}</TableCell>
                  <TableCell align="left">{card.updated}</TableCell>
                  <TableCell align="left">
                    <Rating name="size-medium" value={card.grade} />
                  </TableCell>
                  <TableCell align="left">
                    <ActionsForCards onStudyClick={onStudyClick} card={card} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className={s.container}>
                <span className={s.message}>
                  {'Nothing was found. Change your search parameters'}
                </span>
              </div>
            )}
          </TableBody>
        </Table>
        {/*<button onClick={buttonOnClick}>Get cards</button>*/}
      </TableContainer>
      {/*<SuperPagination paginationTitle={'Packs per Page'} setPacksPerPage={setPacksPerPage} />*/}
    </>
  )
}
