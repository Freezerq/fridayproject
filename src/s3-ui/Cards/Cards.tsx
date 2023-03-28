import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

import { PATH } from '../../app/Routes/AppRoutes'
import { AddNewCardType } from '../../s1-DAL/cardsAPI'
import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { addNewCard, getCards } from '../../s2-BLL'
import {
  cardsSelector,
  cardsTotalCountSelector,
  isLoggedInSelector,
  packNameSelector,
  SearchField,
} from '../../s4-common'

import s from './Cards.module.scss'
import { CardsHeader } from './CardsHeader/CardsHeader'
import { CardsTableBody } from './CardsTableBody/CardsTableBody'
import { CardsTableHead } from './CardsTableHead/CardsTableHead'

export const Cards = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(packNameSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  //set params into URL
  const [searchParams, setSearchParams] = useSearchParams()
  //get Single Params From URL
  const searchValue = searchParams.get('cardQuestion')
  const sortCards = searchParams.get('sortCards')
  const rows = Number(searchParams.get('pageCount'))
  const pageNumber = Number(searchParams.get('page'))
  const cardsPack_id = searchParams.get('cardsPack_id')
  //to get params from URL after Question Mark
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  useEffect(() => {
    if (!isLoggedIn) return

    dispatch(getCards({ ...paramsFromUrl, cardsPack_id: cardsPack_id }))
    //dispatch(getCards({ cardsPack_id: cardsPack_id }))
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

  const setRowsAndPage = (rowsPerPage: number, pageNumber: number) => {
    setSearchParams({
      ...paramsFromUrl,
      pageCount: rowsPerPage.toString(),
      page: pageNumber.toString(),
    })
  }

  const onAddNewCardHandler = (data: AddNewCardType) => {
    dispatch(addNewCard({ ...data, cardsPack_id }, { ...paramsFromUrl, cardsPack_id }))
  }

  if (cardsPack_id === null) return <Navigate to={PATH.PACKS} />

  return (
    <>
      <CardsHeader packName={packName} onAddNewCard={onAddNewCardHandler} packId={cardsPack_id} />
      <TableContainer component={Paper}>
        <SearchField
          onSearchName={onSearchNameDebounce}
          searchValue={searchValue ?? ''}
          searchParams={searchParams}
        />
        {cards?.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <CardsTableHead setSort={setSortCards} sort={sortCards ?? '0updated'} />
            <CardsTableBody />
          </Table>
        ) : (
          <div className={s.container}>
            <span className={s.message}>{'Nothing was found. Change your search parameters'}</span>
          </div>
        )}
      </TableContainer>
    </>
  )
}
