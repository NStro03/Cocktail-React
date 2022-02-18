import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { searchText, setSearchText } = useGlobalContext()
  const searchRef = useRef('');

  useEffect(() => {
    searchRef.current.focus();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='search'>search your favorite cocktail</label>
          <input
            type='text'
            name='search'
            id='search'
            ref={searchRef}
            value={searchText}
            onChange={() => setSearchText(searchRef.current.value)}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
