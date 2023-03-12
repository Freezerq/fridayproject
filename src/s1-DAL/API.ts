import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  authMe() {
    return instance.post<UserType>('auth/me')
  },
  register(data: RegisterType) {
    return instance.post('/auth/register', data)
  },
  login(data: LoginType) {
    return instance.post<UserType>('auth/login', data)
  },
  logout() {
    return instance.delete('auth/me')
  },
  changeName(name: string) {
    return instance.put<AxiosResponse<UpdateUserResponseType>>('auth/me', { name })
  },
  changeImage(avatar: string) {
    return instance.put<AxiosResponse<UpdateUserResponseType>>('auth/me', { avatar })
  },
  getToken(email: string) {
    return instance.post<{ info: string; error: string }>(
      'auth/forgot',
      {
        email,
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
      },
      { baseURL: 'https://neko-back.herokuapp.com/2.0' }
    )
  },
  createNewPassword(data: NewPasswordType) {
    return instance.post<InfoResponseType>('auth/set-new-password', data, {
      baseURL: 'https://neko-back.herokuapp.com/2.0',
    })
  },
  blockUser(data: BlockUserType) {
    return instance.post<BlockUserResponseType>('auth/block', data)
  },
}

export const packsAPI = {
  getAllPacks({ packName, min, max, sortPacks, page, pageCount, user_id, block }: GetPacksType) {
    return instance.get<AllPacksReturnType>('/cards/pack', {
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
//auth Types
export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean

  error?: string
}
export type AddedUserResponseType = {
  addedUser: UserType
  error?: string
}
export type UpdateUserResponseType = {
  updatedUser: UserType
  error?: string
}
export type InfoResponseType = {
  info: string
  error?: string
}
export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}
//everything from LoginType except 'rememberMe
export type RegisterType = Omit<LoginType, 'rememberMe'>
export type NewPasswordType = {
  password: string
  resetPasswordToken: string
}
export type BlockUserType = {
  id: string
  blockReason: string
}
export type BlockUserResponseType = {
  user: string
  blockedCardPacksCount: number
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

//cardsAPI types
export type CardType = {
  _id: string
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: Date
  updated: Date
}

export type AllCardsReturnType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
//все из этого не обязательно, Partial делает атрибуты необязательными
export type GetCardsType = Partial<{
  cardAnswer: string
  cardQuestion: string
  cardsPack_id: string
  min: number
  max: number
  sortCards: number
  page: number
  pageCount: number
}>
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

export type UpdateCardType = Pick<Partial<CardType>, '_id'>
