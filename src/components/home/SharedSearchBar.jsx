import React from 'react';
import { Link } from 'react-router-dom';

const SharedSearchBar = ({ query, setQuery, handleSearch, results = [], isLoading }) => {
  return (
    <div className="w-full max-w-xl">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className='flex items-center bg-white rounded-xl overflow-hidden shadow-lg w-full border border-gray-100 mb-4'>
        <span className='pl-3 sm:pl-5 text-gray-400 flex-shrink-0'>
          <svg width='18' height='18' className='sm:w-5 sm:h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <circle cx='11' cy='11' r='8' />
            <line x1='21' y1='21' x2='16.65' y2='16.65' />
          </svg>
        </span>
        <input
          type='text'
          placeholder='Facing symptoms? Type them in'
          className='flex-1 px-3 sm:px-4 py-3 sm:py-4 outline-none text-gray-700 bg-transparent placeholder-gray-500 text-sm sm:text-base font-medium'
          value={query || ''}
          onChange={(e) => setQuery && setQuery(e.target.value)}
        />
        <button
          type='submit'
          className='bg-gradient-to-r from-[#ff3576] to-[#e1006a] text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 font-semibold hover:from-[#e1006a] hover:to-[#c9005a] transition-all duration-300 flex items-center gap-1 sm:gap-2'
        >
          <span className='hidden sm:inline'>Search</span>
          <svg width='14' height='14' className='sm:w-4 sm:h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path d='M5 12h14M12 5l7 7-7 7'/>
          </svg>
        </button>
      </form>

      {/* Search Results */}
      {isLoading && <div className='text-white/90 font-medium mb-1 text-sm sm:text-base'>Searching...</div>}
      {results.length > 0 && (
        <div className='bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg max-w-lg w-full mb-4'>
          <p className='text-white/90 font-medium mb-1 text-sm sm:text-base'>Suggested results:</p>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <Link to={result.path} className='text-lg sm:text-xl font-bold text-white hover:text-pink-400 transition-colors'>
                  {result.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SharedSearchBar;
