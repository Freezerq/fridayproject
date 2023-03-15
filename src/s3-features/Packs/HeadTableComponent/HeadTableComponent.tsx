import React from 'react'

import { HeadTable } from './HeadTable/HeadTable'

export type HeaderType<D> = {
  id: keyof D
  label: string
}
export type PackData = {
  name: string
  cardsCount: string
  updated: string
  user_name: string
  actions: string
}

const headerTableComponent: HeaderType<PackData>[] = [
  { id: 'name', label: 'Name' },
  { id: 'cardsCount', label: 'Cards' },
  { id: 'updated', label: 'Last updated' },
  { id: 'user_name', label: 'Created by' },
  { id: 'actions', label: 'Actions' },
]

type PacksTableHeadProps = {
  setSort: (sortPacks: string) => any
  sort: string
}

export const HeadTableComponent = (props: PacksTableHeadProps) => {
  const sortBy = props.sort ? props.sort.substring(1) : 'update'
  const sortOrder = props.sort ? props.sort[0] : '0'

  return (
    <HeadTable
      header={headerTableComponent}
      setSort={props.setSort}
      sortBy={sortBy}
      sortOrderStart={sortOrder}
    />
  )
}
