import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../s1-DAL/store'
import { setShowAnswer } from '../../../s2-BLL/learnSlice'
import { SuperButton } from '../../../s4-common/common/SuperButton/SuperButton'

import s from './Question.module.scss'

export const Question = () => {
  const showAnswer = useAppSelector(state => state.learn.showAnswer)
  const question = useAppSelector(state => state.learn.currentCard.question)
  const shots = useAppSelector(state => state.learn.currentCard.shots)
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    dispatch(setShowAnswer({ showAnswer: true }))
  }

  return (
    <div className={s.questionContainer}>
      <div className={s.question}>
        <b>Question: </b>
        {question}
      </div>
      <span
        className={s.numberOfAnswer}
      >{`Number of attempts to answer the question: ${shots}`}</span>
      {!showAnswer && (
        <SuperButton className={s.button} onClick={onClickHandler}>
          Show answer
        </SuperButton>
      )}
    </div>
  )
}
