import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { addNewPack, getPacks } from '../../s2-BLL/packSlice'
import moreVertical from '../../s4-components/common/image/more-vertical.svg'
import { SearchField } from '../../s4-components/common/SearchField/SearchField'
import { SuperButton } from '../../s4-components/common/SuperButton/SuperButton'
import { ActionsForPacks } from '../Actions/ActionsForPacks'
import { FilterPanel } from '../FilterPanel/FilterPanel'
import { SuperPagination } from '../Pagination/Pagination'
import { PATH } from '../Routes/AppRoutes'

import { EditBar } from './editBar/EditBar'
import s from './Packs.module.scss'
import { PacksTableHead } from './PacksTableHead'

export const Packs = () => {
  const packs = useAppSelector(state => state.packs.packsData.cardPacks)
  const packsTotalCount = useAppSelector(state => state.packs.packsData.cardPacksTotalCount)
  const userId = useAppSelector(state => state.auth.profile._id)
  const maxCardsValue = useAppSelector(state => state.packs.packsData.maxCardsCount)
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
  const searchValue = searchParams.get('packName')
  const sortPacks = searchParams.get('sortPacks')
  const searchId = searchParams.get('user_id')

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
  const setSortPacks = (sortPacks: string) => {
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

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <>
      <div className={s.headerContainer}>
        <div className={s.header}>
          <div className={s.titleBlock}>
            <span className={s.title}>Packs list</span>
            <div className={s.popUpBar}>
              <img
                src={moreVertical}
                alt={'open menu'}
                onClick={handleOpen}
                className={s.moreImg}
              />
              <EditBar open={open} handleClose={handleClose} />
            </div>
          </div>

          <SuperButton
            style={{
              letterSpacing: '0.01em',
              fontSize: '16px',
              width: '175px',
            }}
            onClick={buttonOnClick}
          >
            Add new pack
          </SuperButton>
        </div>
      </div>
      <TableContainer component={Paper}>
        <div className={s.filterContainer}>
          <SearchField
            onSearchName={onSearchNameDebounce}
            searchValue={searchValue ?? ''}
            classname={s.search}
            searchParams={searchParams}
          />
          <FilterPanel
            minSearchCardsNumber={minSearchCardsNumber}
            maxSearchCardsNumber={maxSearchCardsNumber}
            showAllPacks={showAllPacks}
            showMyPacks={showMyPacks}
            resetFilters={resetFilters}
            onChangeSlider={onChangeCardValues}
            maxCardsValue={maxCardsValue}
            searchId={searchId ?? ''}
          />
        </div>

        {packs?.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <PacksTableHead sort={sortPacks ?? '0updated'} setSort={setSortPacks} />
            <TableBody>
              {packs?.map(pack => (
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
                  <TableCell align="left">{pack.updated.substring(0, 10)}</TableCell>
                  <TableCell align="left">{pack.user_name}</TableCell>
                  <TableCell align="left">
                    <ActionsForPacks pack={pack} onStudyClick={onNameClickHandler} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className={s.container}>
            <span className={s.message}>{'Nothing was found. Change your search parameters'}</span>
          </div>
        )}
      </TableContainer>

      <SuperPagination
        paginationTitle={'Packs per Page'}
        setRowsAndPage={setRowsAndPage}
        totalCount={packsTotalCount ?? 0}
        rows={rows === 0 ? 4 : rows}
        page={pageNumber === 0 ? 0 : pageNumber - 1}
      />
    </>
  )
}
