import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useGlobalContext } from '../context';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams();
  const { cocktailList, isLoading, setIsLoading } = useGlobalContext();
  const [currentCocktail, setCurrentCocktail] = useState({});

  useEffect(() => {
    let cocktail = cocktailList.find((cocktail) => cocktail["idDrink"] === id);

    async function fetchAndSetCocktail() {
      let response = await fetch(url + id);
      const cocktails = await response.json();
      setCurrentCocktail(cocktails['drinks']?.[0]);
      setIsLoading(false);
    }

    if (!cocktail) {
      fetchAndSetCocktail();
    }
    else {
      setCurrentCocktail(cocktail);
      setIsLoading(false);
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }
  if (!currentCocktail) {
    return (<h2>No cocktails found</h2>);
  }

  const ingredientList = [
    currentCocktail["strIngredient1"],
    currentCocktail["strIngredient2"],
    currentCocktail["strIngredient3"],
    currentCocktail["strIngredient4"],
    currentCocktail["strIngredient5"],
    currentCocktail["strIngredient6"]
  ]
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>Back to Home</Link>
      <h2 className='section-title'>{currentCocktail["strDrink"]}</h2>
      <div className='drink'>
        <img src={currentCocktail["strDrinkThumb"]} alt={currentCocktail["strDrink"]} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name: </span>{currentCocktail["strDrink"]}
          </p>
          <p>
            <span className='drink-data'>Category: </span>{currentCocktail["strCategory"]}
          </p>
          <p>
            <span className='drink-data'>Info: </span>{currentCocktail["strAlcoholic"]}
          </p>
          <p>
            <span className='drink-data'>Glass: </span>{currentCocktail["strGlass"]}
          </p>
          <p>
            <span className='drink-data'>Instructions: </span>{currentCocktail["strInstructions"]}
          </p>
          <p>
            <span className='drink-data'>Ingredients: </span>
            {ingredientList.map((ing, index) => {
              return ing ? <span key={index}>{ing}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
