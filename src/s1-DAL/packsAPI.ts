import axios, { AxiosResponse } from 'axios'

import { PackTypeFromServer } from '../s2-BLL/packSlice'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const packsAPI = {
  getAllPacks({ packName, min, max, sortPacks, page, pageCount, user_id, block }: GetPacksType) {
    return instance.get('/cards/pack', {
      params: {
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        user_id,
        block,
      },
    })
  },
  addNewPack(data: AddNewPackType) {
    return instance.post('/cards/pack', { cardsPack: data })
  },
  deletePack(id: string) {
    return instance.delete(`cards/pack?id=${id}`)
  },
  updatePack(data: UpdatePackType) {
    return instance.put('cards/pack', { cardsPack: data })
  },
}

//Packs Types
export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: Date
  updated: Date
}

export type AllPacksReturnType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
}

//все из этого не обязательно, Partial делает атрибуты необязательными
export type GetPacksType = Partial<{
  packName: string
  min: number
  max: number
  sortPacks: number
  page: number
  pageCount: number
  user_id: string
  block: boolean
}>

export type AddNewPackType = {
  name: string
  deckCover?: string
  private?: string
}

//id обязательно, а все остальное из packtype не обязательно, Pick выбирает обязательный атрибут
export type UpdatePackType = Pick<Partial<PackType>, '_id'>
