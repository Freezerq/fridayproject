import React, { useEffect } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getCards } from '../../s2-BLL/cardsSlice'
import { setCurrentCard, setIsFirst } from '../../s2-BLL/learnSlice'
import { getRandomCard } from '../../utils/getRandomCards'
import { PATH } from '../Routes/AppRoutes'

import s from './Learn.module.scss'

export const Learn = () => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const packName = useAppSelector(state => state.cards.cardsData.packName)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const first = useAppSelector(state => state.learn.isFirst)
  const question = useAppSelector(state => state.learn.currentCard.question)
  const navigate = useNavigate()
  const buttonBackOnClick = () => {
    navigate(PATH.PACKS)
  }
  const dispatch = useAppDispatch()
  // const [searchParams, setSearchParams] = useSearchParams()
  // const cardsPack_id = searchParams.get('cardsPack_id')
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))
  const { packId } = useParams<{ packId: string }>()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getCards({ ...paramsFromUrl, cardsPack_id: packId ?? '' }))
  }, [packId, isLoggedIn])

  useEffect(() => {
    if (first) {
      dispatch(setIsFirst({ isFirst: false }))
    }
    if (cards.length > 0) {
      dispatch(setCurrentCard(getRandomCard(cards)))
    }
  }, [isLoggedIn, packId, first, cards])

  return (
    <>
      <div style={{ display: 'flex', margin: '15px', alignItems: 'center' }}>
        <ArrowBackIcon onClick={buttonBackOnClick} />
        <span>Back to Packs List</span>
      </div>
      <div className={s.questionContainer}>
        <div className={s.title}>Learn &quot;{packName}&quot;</div>
        <Paper elevation={3}>
          <div>{question}</div>
        </Paper>
      </div>
    </>
  )
}
