import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cocktailList, setCocktailList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const updateCocktailList = useCallback(
    async () => {
      console.log("Updating Cocktail List")
      setIsLoading(true);
      try {
        let response = await fetch(url + searchText);
        const newCocktailList = await response.json();
        if (newCocktailList['drinks']) {
          setCocktailList(newCocktailList['drinks']);
        }
        else {
          setCocktailList([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        setIsLoading(false);
      }
    },
    [searchText],
  )

  useEffect(() => {
    updateCocktailList();
  }, [searchText, updateCocktailList])

  const appData = {
    isLoading,
    setIsLoading,
    cocktailList,
    searchText,
    setSearchText
  }

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
