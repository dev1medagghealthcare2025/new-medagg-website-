import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

const SharedSearchBar = ({
  query,
  setQuery,
  handleSearch,
  results = [],
  isLoading,
  onInputFocus,
  onInputBlur,
  compact = false,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  return (
    <div className='w-full max-w-xl relative'>
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className={`flex items-center bg-white overflow-hidden shadow-lg w-full border border-gray-100 mb-0 ${
          compact ? 'rounded-[10px]' : 'rounded-xl'
        }`}>
        {compact ? (
          <span className='pl-3 text-gray-400 flex-shrink-0'>
            <Search size={15} strokeWidth={2} />
          </span>
        ) : (
          <span className='pl-3 sm:pl-5 text-gray-400 flex-shrink-0'>
            <svg width='18' height='18' className='sm:w-5 sm:h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
          </span>
        )}
        <input
          type='text'
          placeholder='Facing symptoms? Type them in'
          className={`flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-500 font-medium ${
            compact
              ? 'px-3 py-3 text-[11px] placeholder:text-gray-500'
              : 'px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base placeholder-gray-500'
          }`}
          value={query || ''}
          onChange={(e) => setQuery && setQuery(e.target.value)}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        <button
          type='submit'
          className={
            compact
              ? 'h-10 w-10 bg-[#ff2f7d] text-white inline-flex items-center justify-center hover:bg-pink-600 transition-colors shrink-0'
              : 'bg-gradient-to-r from-[#ff3576] to-[#e1006a] text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 font-semibold hover:from-[#e1006a] hover:to-[#c9005a] transition-all duration-300 flex items-center gap-1 sm:gap-2'
          }
          aria-label='Search'
        >
          {compact ? (
            <ArrowRight size={15} />
          ) : (
            <>
              <span className='hidden sm:inline'>Search</span>
              <svg width='14' height='14' className='sm:w-4 sm:h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                <path d='M5 12h14M12 5l7 7-7 7'/>
              </svg>
            </>
          )}
        </button>
      </form>
 
      {/* Suggestions overlay (adaptive theme, no layout shift) */}
      {(isLoading || results.length > 0) && (
        <div className='absolute left-0 right-0 top-full mt-1 z-50'>
          <div className={
            isLight
              ? 'bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-lg w-full shadow-xl border border-gray-200/50'
              : 'bg-[#e0e0e05e] backdrop-blur-sm p-3 sm:p-4 rounded-lg w-full'
          }>
            <p className={`font-semibold mb-1 text-sm sm:text-base ${isLight ? 'text-gray-800' : 'text-white/90'}`}>
              Suggested results{isLoading ? '...' : ':'}
            </p>
            {results.length > 0 && (
              <ul>
                {results.map((result, index) => (
                  <li key={index}>
                    <Link
                      to={result.path}
                      className={`text-lg sm:text-xl font-bold transition-colors ${
                        isLight ? 'text-[#1a1446] hover:text-[#ff3576]' : 'text-white hover:text-pink-400'
                      }`}
                    >
                      {result.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedSearchBar;
