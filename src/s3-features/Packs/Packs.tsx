import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getCards, setCards, setCardsAttributes } from '../../s2-BLL/cardsSlice'
import {
  addNewPack,
  getPacks,
  resetPacksAttributes,
  setPacksAttributes,
} from '../../s2-BLL/packSlice'
import { Actions } from '../Actions/Actions'
import { FilterPanel } from '../FilterPanel/FilterPanel'
import { SuperPagination } from '../Pagination/Pagination'
import { PATH } from '../Routes/AppRoutes'

export const Packs = () => {
  const packs = useAppSelector(state => state.packs.packsData.cardPacks)
  const packsTotalCount = useAppSelector(state => state.packs.packsData.cardPacksTotalCount)
  const attributes = useAppSelector(state => state.packs.attributesData)
  const packsPerPage = useAppSelector(state => state.packs.attributesData.pageCount)
  const currentPage = useAppSelector(state => state.packs.attributesData.page)
  const userId = useAppSelector(state => state.auth.profile._id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  //set params into URL
  const [searchParams, setSearchParams] = useSearchParams()

  //to get params from URL after Question Mark
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  //setSearchParams({ user_id: userId }, { replace: false })
  console.log(paramsFromUrl)


  const buttonOnClick = () => {
    dispatch(addNewPack({ name: 'irina' }, attributes))
  }

  useEffect(() => {
    if (!isLoggedIn) return

    console.log(attributes)
    dispatch(getPacks(attributes))
  }, [attributes, isLoggedIn])

  const showMyPacks = () => {
    dispatch(setPacksAttributes({ attributes: { user_id: userId } }))
  }
  const showAllPacks = () => {
    dispatch(setPacksAttributes({ attributes: { user_id: undefined } }))
  }

  const resetFilters = () => {
    dispatch(resetPacksAttributes({}))
  }

  const setPacksPerPage = (rowsPerPage: number, page: number) => {
    dispatch(setPacksAttributes({ attributes: { pageCount: rowsPerPage, page } }))
  }

  const onNameClickHandler = (id: string) => {
    dispatch(setCardsAttributes({ attributes: { cardsPack_id: id } }))
    navigate(PATH.CARDS)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <FilterPanel
          showAllPacks={showAllPacks}
          showMyPacks={showMyPacks}
          resetFilters={resetFilters}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: '#EFEFEF' }}>
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
            ))}
          </TableBody>
        </Table>
        <button onClick={buttonOnClick}>add pack</button>
      </TableContainer>

      <SuperPagination
        paginationTitle={'Packs per Page'}
        setPacksPerPage={setPacksPerPage}
        packsTotalCount={packsTotalCount}
        currentPage={currentPage ?? 1}
        packsPerPage={packsPerPage ?? 4}
      />
    </>
  )
}
