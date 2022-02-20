import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const { isLoading, cocktailList } = useGlobalContext();

  if (isLoading) {
    return <Loading />
  }
  if (!cocktailList || cocktailList.length < 1) {
    return (<h2>No cocktails found</h2>);
  }
  const cocktailComponents = cocktailList.map((cocktail) => {
    return (
      <Cocktail
        key={cocktail['idDrink']}
        idDrink={cocktail['idDrink']}
        strDrink={cocktail['strDrink']}
        strAlcoholic={cocktail['strAlcoholic']}
        strDrinkThumb={cocktail['strDrinkThumb']}
        strGlass={cocktail['strGlass']}
      />
    )
  })

  return (
    <section className='section'>
      <h2 className='section-title'>Cocktails</h2>
      <div className='cocktails-center'>
        {cocktailComponents}
      </div>
    </section>
  )
}

export default CocktailList
