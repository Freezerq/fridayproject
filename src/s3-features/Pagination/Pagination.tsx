import React, { FC, useEffect, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

import s from './Pagination.module.css'

type PaginationPropsType = {
  paginationTitle: string
  setRowsAndPage: (rowsPerPage: number, page: number) => void
  packsTotalCount: number
  rows: number
  page: number
}

export const SuperPagination: FC<PaginationPropsType> = ({
  paginationTitle,
  setRowsAndPage,
  packsTotalCount,
  rows,
  page,
}) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setRowsAndPage(rows, newPage + 1)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let rowsNumber = Number(event.target.value)

    setRowsAndPage(rowsNumber, 1)
  }

  return (
    <div className={s.pagination}>
      <TablePagination
        component="div"
        count={packsTotalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[4, 7, 10, 15]}
        rowsPerPage={rows}
        labelRowsPerPage={paginationTitle}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
    </div>
  )
}
