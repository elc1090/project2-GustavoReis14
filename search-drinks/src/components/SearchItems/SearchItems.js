import React, { useState, useEffect } from "react";
import './SearchItems.css';
import apiRoutes from "../../utils/Utils";

const SearchItems = ({ searchedItems }) => {
  const [searchLimit, setSearchLimit] = useState(10);
  const [focusedItem, setFocusedItem] = useState(null);

  useEffect(() => {
    searchedItems[0] && getRecipe(searchedItems[0]);

    return () => {};
  }, []);

  const getRecipe = async (item) => {
    const response = await fetch(apiRoutes.findByName + item.strDrink);
    const jsonData = await response.json();

    const recipe = jsonData.drinks[0];
    recipe.measurements = [];

    for(let i = 0; i < 15; i++) {
      if(recipe[`strMeasure${i}`]) {
        recipe.measurements.push(`${recipe[`strIngredient${i}`]} (${recipe[`strMeasure${i}`]})`);
      }
    }

    setFocusedItem(recipe);
  };

  const renderItem = (item) => {
    return (
      <div key={item.strDrink} className="card-container" onClick={() => getRecipe(item)}>
        <img src={item.strDrinkThumb} alt={item.strDrink} className="card-image"/>
        <h1 className="card-title">{item.strDrink}</h1>
      </div>
      );
  };

  const renderFocused = () => {
    return(
      <div className="focused-item">
        <img src={focusedItem.strDrinkThumb} alt={focusedItem.strDrink}/>
        <h1>{focusedItem.strDrink}</h1>
        <h2>Ingredients</h2>
        <ul>
          {focusedItem?.measurements?.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p>{focusedItem.strInstructions}</p>
      </div>
    );
  };

  return (
    <>
      <div className="list-cards">
        <ul>
          {[...searchedItems.slice(0, searchLimit)].map(renderItem)}
        </ul>
        {focusedItem && renderFocused()}
      </div>
      {searchedItems.length > searchLimit && <button className="button" onClick={() => setSearchLimit(searchLimit + 5)}>+</button>}
    </>
    
  );

};

export default SearchItems;