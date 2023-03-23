import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { useLocation, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getCards } from '../../s2-BLL/cardsSlice'
import { setCurrentCard, setIsFirst } from '../../s2-BLL/learnSlice'
import { BackToPacksList } from '../../s4-common/common/BackToPacksList/BackToPacksList'
import { LinearProgress } from '../../s4-common/common/LinearProgress/LinearProgress'
import { appStatusSelector } from '../../s4-common/selectors/appSelectors'
import { isLoggedInSelector } from '../../s4-common/selectors/authSelectors'
import { cardsSelector, packNameSelector } from '../../s4-common/selectors/cardsSelectors'
import { firstSelector, showAnswerSelector } from '../../s4-common/selectors/learnSelectors'
import { getRandomCard } from '../../utils/getRandomCards'

import { Answer } from './Answer/Answer'
import s from './Learn.module.scss'
import { Question } from './Question/Question'

export const Learn = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(packNameSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const first = useAppSelector(firstSelector)
  const showAnswer = useAppSelector(showAnswerSelector)
  const appStatus = useAppSelector(appStatusSelector)

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
