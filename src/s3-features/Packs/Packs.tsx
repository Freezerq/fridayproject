import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { addNewPack, getPacks } from '../../s2-BLL/packSlice'
import { Actions } from '../Actions/Actions'
import { FilterPanel } from '../FilterPanel/FilterPanel'
import { SuperPagination } from '../Pagination/Pagination'
import { PATH } from '../Routes/AppRoutes'

import { HeadTableComponent } from './HeadTableComponent/HeadTableComponent'
import s from './Packs.module.scss'

export const Packs = () => {
  const packs = useAppSelector(state => state.packs.packsData.cardPacks)
  const packsTotalCount = useAppSelector(state => state.packs.packsData.cardPacksTotalCount)
  const userId = useAppSelector(state => state.auth.profile._id)
  const maxCardsValue = useAppSelector(state => state.packs.packsData.maxCardsCount)
  const initialRows = useAppSelector(state => state.packs.packsData.pageCount)
  const initialPage = useAppSelector(state => state.packs.packsData.page)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  //set params into URL
  const [searchParams, setSearchParams] = useSearchParams()
  //get Single Params From URL
  const minSearchCardsNumber = Number(searchParams.get('min'))
  const maxSearchCardsNumber = Number(searchParams.get('max'))
  const rows = Number(searchParams.get('pageCount'))
  const pageNumber = Number(searchParams.get('page'))
  const SearchValue = searchParams.get('packName')
  const sort = searchParams.get('sortPacks')

  //to get params from URL after Question Mark
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getPacks(paramsFromUrl))
  }, [searchParams, isLoggedIn])

  const showMyPacks = () => {
    setSearchParams({ ...paramsFromUrl, user_id: userId })
  }
  const showAllPacks = () => {
    const param = searchParams.get('user_id')

    if (param) {
      searchParams.delete('user_id')
      setSearchParams(searchParams)
    }
  }

  const resetFilters = () => {
    setSearchParams({})
  }

  const setRowsAndPage = (rowsPerPage: number, pageNumber: number) => {
    setSearchParams({
      ...paramsFromUrl,
      pageCount: rowsPerPage.toString(),
      page: pageNumber.toString(),
    })
  }
  const onChangeCardValues = (min: number, max: number) => {
    setSearchParams({ ...paramsFromUrl, min: min.toString(), max: max.toString() })
  }
  const setSort = (sortPacks: string) => {
    setSearchParams({
      ...paramsFromUrl,
      sortPacks,
    })
  }

  const onSearchNameDebounce = (value: string) => {
    setSearchParams({ ...paramsFromUrl, packName: value })
  }

  const buttonOnClick = () => {
    dispatch(addNewPack({ name: 'irina' }, paramsFromUrl))
  }
  const onNameClickHandler = (id: string) => {
    navigate(PATH.CARDS + `?cardsPack_id=${id}`)
  }

  return (
    <>
      <FilterPanel
        minSearchCardsNumber={minSearchCardsNumber}
        maxSearchCardsNumber={maxSearchCardsNumber}
        showAllPacks={showAllPacks}
        showMyPacks={showMyPacks}
        resetFilters={resetFilters}
        onChangeSlider={onChangeCardValues}
        maxCardsValue={maxCardsValue}
        searchValue={SearchValue}
        onSearchName={onSearchNameDebounce}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <HeadTableComponent sort={sort ?? '0updated'} setSort={setSort} />

          <TableBody>
            {packs?.length > 0 ? (
              packs?.map(pack => (
                <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    style={{ backgroundColor: 'gray' }}
                    onClick={() => onNameClickHandler(pack._id)}
                    component="th"
                    scope="row"
                  >
                    {pack.name}
                  </TableCell>
                  <TableCell align="left">{pack.cardsCount}</TableCell>
                  <TableCell align="left">{pack.updated}</TableCell>
                  <TableCell align="left">{pack.user_name}</TableCell>
                  <TableCell align="left">
                    <Actions pack={pack} onStudyClick={onNameClickHandler} />
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
        <button onClick={buttonOnClick}>add pack</button>
      </TableContainer>

      <SuperPagination
        paginationTitle={'Packs per Page'}
        setRowsAndPage={setRowsAndPage}
        packsTotalCount={packsTotalCount}
        rows={rows === 0 ? 4 : rows}
        pageNumber={pageNumber === 0 ? 0 : pageNumber - 1}
      />
    </>
  )
}
