import React from 'react'
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onChangePage }) => {

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1)
    }
  }
  return (
    <div className='text'>
      <button className='select' onClick={handlePreviousPage} disabled={currentPage === 1}>
        Prev
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button className='select' onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination
