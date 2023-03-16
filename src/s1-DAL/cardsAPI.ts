import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  getAllCards({
    cardAnswer,
    cardQuestion,
    cardsPack_id,
    min,
    max,
    sortCards,
    page,
    pageCount,
  }: GetCardsType) {
    return instance.get('/cards/card', {
      params: {
        cardAnswer,
        cardQuestion,
        cardsPack_id,
        min,
        max,
        sortCards,
        page,
        pageCount,
      },
    })
  },
  addNewCard(data: AddNewCardType) {
    return instance.post('/cards/card', { card: data })
  },
  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`)
  },
  updateCard(data: UpdateCardType) {
    return instance.put('cards/card', { card: data })
  },
}

//types
export type CardType = {
  _id: string
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
}

export type CardsReturnType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
  packDeckCover?: string | null
}
//все из этого не обязательно, Partial делает атрибуты необязательными
export type GetCardsType = Partial<GetCardsAttributesType> &
  Pick<GetCardsAttributesType, 'cardsPack_id'>
export type GetCardsAttributesType = {
  cardAnswer: string
  cardQuestion: string
  cardsPack_id: string | null
  min: number
  max: number
  sortCards: number
  page: number
  pageCount: number
}
//cardsPack_id обязательно, остальное - не обязательно
export type AddNewCardType = Pick<CardType, 'cardsPack_id'> &
  Partial<{
    answer: string
    question: string
    grade: number
    shots: number
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
  }>

export type UpdateCardType = Partial<CardType> & Pick<CardType, '_id'>
