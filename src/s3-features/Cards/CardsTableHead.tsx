import React from 'react'

import { HeadTable } from '../../s4-components/common/HeadTable/HeadTable'
import { HeaderType } from '../Packs/PacksTableHead'

export type CardData = {
  question: string
  answer: string
  updated: string
  grade: string
  empty: string
}

const headerCardsTable: HeaderType<CardData>[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'grade', label: 'Grade' },
]

type CardsTableHeadType = {
  setSort: (sortCards: string) => any
  sort: string
}

export const CardsTableHead = (props: CardsTableHeadType) => {
  const sortBy = props.sort ? props.sort.substring(1) : 'update'
  const sortOrder = props.sort ? props.sort[0] : '0'

  return (
    <HeadTable
      header={headerCardsTable}
      setSort={props.setSort}
      sortOrderStart={sortOrder}
      sortBy={sortBy}
    />
  )
}
