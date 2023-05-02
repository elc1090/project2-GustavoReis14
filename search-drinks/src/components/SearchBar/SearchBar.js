import React, {useState} from 'react';
import './SearchBar.css';

const SearchBar = ({handleSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');	
  
  return (
    <div className="search-bar">
      <div>
        <input className='input-bar' type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
        <button className='search-button' onClick={() => handleSearch(searchType, searchTerm)}>Search</button>
      </div>
      <div className='button-group'>
          <input type='radio' value='Name' name='type' onClick={() => setSearchType('findByName')}/>Name
          <input type='radio' value='Ingredient' name='type' onClick={() => setSearchType('findByIngredient')}/>Ingredient
          <input type='radio' value='Category' name='type' onClick={() => setSearchType('findByGlass')}/>Category
          <input type='radio' value='Glass' name='type' onClick={() => setSearchType('findByGlass')}/>Glass
      </div>
    </div>
  );
};

export default SearchBar;