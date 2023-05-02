import React, { useState } from 'react';
import LoadingSpin from "react-loading-spin"; //https://www.npmjs.com/package/react-loading-spin
import SearchBar from './components/SearchBar/SearchBar';
import SearchItems from './components/SearchItems/SearchItems';

import apiRoutes from './utils/Utils';

import './App.css';

const App = () => {
  const [searchedItems, setSearchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (searchType, searchTerm) => {
    setIsLoading(true);
    const response = await fetch(apiRoutes[searchType] + searchTerm);
    const jsonData = await response.json();
    
    setSearchedItems(jsonData.drinks);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <h1>Search Drinks</h1>
      <SearchBar handleSearch={search}/>
      <div className='separator'> </div>
      {isLoading ? <LoadingSpin/> : <SearchItems searchedItems={searchedItems}/> }
    </div>
  );
}

export default App;
