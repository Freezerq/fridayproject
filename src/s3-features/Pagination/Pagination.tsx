import React, { FC, useEffect, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

import s from './Pagination.module.css'

type PaginationPropsType = {
  paginationTitle: string
  setRowsAndPage: (rowsPerPage: number, page: number) => void
  packsTotalCount: number
  rows: number
  pageNumber: number
}

export const SuperPagination: FC<PaginationPropsType> = ({
  paginationTitle,
  setRowsAndPage,
  packsTotalCount,
  rows,
  pageNumber,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(rows)
  const [page, setPage] = useState<number>(pageNumber)

  useEffect(() => {
    setRowsAndPage(rowsPerPage, page + 1)
  }, [rowsPerPage, page])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let rows = Number(event.target.value)

    setRowsPerPage(rows)
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
