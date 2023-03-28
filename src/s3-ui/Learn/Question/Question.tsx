import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../s1-DAL/store'
import { setShowAnswer } from '../../../s2-BLL'
import {
  questionSelector,
  shotsSelector,
  showAnswerSelector,
  SuperButton,
} from '../../../s4-common'

import s from './Question.module.scss'

export const Question = () => {
  const showAnswer = useAppSelector(showAnswerSelector)
  const question = useAppSelector(questionSelector)
  const shots = useAppSelector(shotsSelector)

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
