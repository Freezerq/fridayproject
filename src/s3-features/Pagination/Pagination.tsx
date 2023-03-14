import React, { FC, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

import s from './Pagination.module.css'

type PaginationPropsType = {
  paginationTitle: string
  setPacksPerPage: (rowsPerPage: number, page: number) => void
  packsTotalCount: number
  currentPage: number
  packsPerPage: number
}

export const SuperPagination: FC<PaginationPropsType> = ({
  paginationTitle,
  setPacksPerPage,
  packsTotalCount,
  currentPage,
  packsPerPage,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(packsPerPage)
  const [page, setPage] = useState<number>(currentPage)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
    setPacksPerPage(rowsPerPage, page)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let rows = Number(event.target.value)

    setRowsPerPage(rows)
    setPacksPerPage(rows, page)
    setPage(0)
  }

  return (
    <div className={s.pagination}>
      <TablePagination
        component="div"
        count={packsTotalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[4, 7, 10, 15]}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={paginationTitle}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
    </div>
  )
}
