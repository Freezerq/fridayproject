import React, { FC, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

import s from './Pagination.module.css'

type PaginationPropsType = {
  paginationTitle: string
  setPacksPerPage: (rowsPerPage: number) => void
}

export const SuperPagination: FC<PaginationPropsType> = ({ paginationTitle, setPacksPerPage }) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(4)
  const [page, setPage] = useState<number>(0)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let rows = Number(event.target.value)

    setRowsPerPage(rows)
    setPacksPerPage(rows)
    setPage(0)
  }

  return (
    <div className={s.pagination}>
      <TablePagination
        component="div"
        count={100}
        page={page}
        // page={currentPage - 1}
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
