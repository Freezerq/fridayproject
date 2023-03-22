import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { useLocation, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getCards } from '../../s2-BLL/cardsSlice'
import { setCurrentCard, setIsFirst } from '../../s2-BLL/learnSlice'
import { BackToPacksList } from '../../s4-common/common/BackToPacksList/BackToPacksList'
import { LinearProgress } from '../../s4-common/common/LinearProgress/LinearProgress'
import { getRandomCard } from '../../utils/getRandomCards'

import { Answer } from './Answer/Answer'
import s from './Learn.module.scss'
import { Question } from './Question/Question'

export const Learn = () => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const packName = useAppSelector(state => state.cards.cardsData.packName)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const first = useAppSelector(state => state.learn.isFirst)
  const showAnswer = useAppSelector(state => state.learn.showAnswer)
  const appStatus = useAppSelector(state => state.app.status)

  const dispatch = useAppDispatch()
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
    if (cards && cards.length > 0) {
      dispatch(setCurrentCard(getRandomCard(cards)))
    }
  }, [isLoggedIn, packId, first, cards])

  if (appStatus === 'loading') {
    return <LinearProgress />
  }

  return (
    <>
      <BackToPacksList />
      <div className={s.questionContainer}>
        <div className={s.title}>Learn &quot;{packName}&quot;</div>
        <Paper elevation={3}>
          <Question />
          {showAnswer && <Answer />}
        </Paper>
      </div>
    </>
  )
}
