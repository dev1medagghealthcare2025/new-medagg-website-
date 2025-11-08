import React, { useState, useEffect, useRef } from 'react';

const placeholders = [
  'Thyroid Nodule',
  'Varicocele',
  'Fallopian Tube Block',
];

const Searchbar = ({ onSearch }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [inputValue, setInputValue] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setPlaceholder(placeholders[placeholderIndex]);
  }, [placeholderIndex]);

  return (
    <div className='flex justify-center my-6'>
      <form
        className='flex w-full max-w-2xl rounded-xl overflow-hidden bg-white shadow'
        onSubmit={e => {
          e.preventDefault();
          if (onSearch) onSearch(inputValue);
        }}
      >
        <div className='flex items-center pl-4 bg-white'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z' />
          </svg>
        </div>
        <input
          type='text'
          className='flex-1 px-4 py-4 text-lg text-gray-700 focus:outline-none bg-white'
          placeholder={placeholder}
          style={{ fontWeight: 'bold', color: '#111' }}
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
        />
        <button
          type='submit'
          className='px-8 py-4 bg-pink-600 text-white font-bold text-lg focus:outline-none hover:bg-pink-700 transition-colors'
          style={{ borderRadius: 0, borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem' }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
