// src/components/SearchBar/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleTermChange = (e) => setTerm(e.target.value);
  const search = () => onSearch(term);

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song Title" onChange={handleTermChange} />
      <button className='SearchBarButton' onClick={search}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
