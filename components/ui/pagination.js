import classNames from '@/utils/class-name'
import * as React from 'react'
function Pagination({ pages, onSwithPage, activePage }) {
  const is_page_active = (index) => {
    return index == activePage
  }
  return (
    <div className="flex flex-wrap justify-center items-center">
      {pages.map((_, page) => (
        <div key={page}>
          <p
            className={classNames(
              'p-5 px-6 m-1 text-white rounded-lg hover:bg-indigo-300 cursor-pointer',
              is_page_active(page) ? 'bg-indigo-300' : 'bg-indigo-500'
            )}
            onClick={() => onSwithPage(page)}
          >
            {page + 1}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Pagination
