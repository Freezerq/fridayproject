import React from 'react'

import { useAppSelector } from '../../s1-DAL/store'

export const Cards = () => {
  const cards = useAppSelector(state => state.cards.cardsData.cards)
  const attributes = useAppSelector(state => state.cards.attributesData)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)

  return <div>Cards</div>
}
