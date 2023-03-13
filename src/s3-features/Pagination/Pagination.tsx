import React, { FC, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

import s from './Pagination.module.css'

type PaginationPropsType = {
  paginationTitle: string
}

export const SuperPagination: FC<PaginationPropsType> = ({ paginationTitle }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
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
