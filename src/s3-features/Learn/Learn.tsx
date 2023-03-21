import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getCards } from '../../s2-BLL/cardsSlice'
import { setCurrentCard, setIsFirst, setShowAnswer } from '../../s2-BLL/learnSlice'
import { BackToPacksList } from '../../s4-common/common/BackToPacksList/BackToPacksList'
import { SuperButton } from '../../s4-common/common/SuperButton/SuperButton'
import { getRandomCard } from '../../utils/getRandomCards'

import { Answer } from './Answer'
import s from './Learn.module.scss'

export const Learn = () => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const packName = useAppSelector(state => state.cards.cardsData.packName)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const first = useAppSelector(state => state.learn.isFirst)
  const question = useAppSelector(state => state.learn.currentCard.question)
  const shots = useAppSelector(state => state.learn.currentCard.shots)
  const showAnswer = useAppSelector(state => state.learn.showAnswer)

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
  const onClickHandler = () => {
    dispatch(setShowAnswer({ showAnswer: true }))
  }

  return (
    <>
      <BackToPacksList />
      <div className={s.questionContainer}>
        <div className={s.title}>Learn &quot;{packName}&quot;</div>
        <Paper elevation={3}>
          <div>Question: {question}</div>
          <span>{`Number of answers to the question: ${shots}`}</span>
          {!showAnswer && (
            <SuperButton
              style={{
                letterSpacing: '0.01em',
                fontSize: '16px',
                width: '175px',
              }}
              onClick={onClickHandler}
            >
              Show answer
            </SuperButton>
          )}
          {showAnswer && <Answer />}
        </Paper>
      </div>
    </>
  )
}
