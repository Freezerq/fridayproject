import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { addNewCard, getCards } from '../../s2-BLL/cardsSlice'
import { SearchField } from '../../s4-common/common/SearchField/SearchField'
import { BasicModal } from '../Modals/BasicModal'
import s from '../Packs/Packs.module.scss'
import { SuperPagination } from '../Pagination/Pagination'
import { PATH } from '../Routes/AppRoutes'

import { CardsHeader } from './CardsHeader/CardsHeader'
import { CardsTableBody } from './CardsTableBody/CardsTableBody'
import { CardsTableHead } from './CardsTableHead/CardsTableHead'

export const Cards = () => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const packName = useAppSelector(state => state.cards.cardsData.packName)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
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

  const onAddNewCardHandler = () => {
    dispatch(addNewCard({ cardsPack_id }, { cardsPack_id }))
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
      <SuperPagination
        paginationTitle={'Cards per Page'}
        setRowsAndPage={setRowsAndPage}
        totalCount={cardsTotalCount ?? 0}
        rows={rows === 0 ? 4 : rows}
        page={pageNumber === 0 ? 0 : pageNumber - 1}
      />
    </>
  )
}
