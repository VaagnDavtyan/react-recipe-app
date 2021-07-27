import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/App.css';
import { v4 as uuidv4 } from 'uuid'
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'
 
function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId )

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipeJSON != null)  setRecipes(JSON.parse(recipeJSON))
  }, []) 

  useEffect(() => {
    console.log('render')
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
    return () => console.log('recipes  set')
  }, [recipes])

  

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

function handleRecipeSelect(id) {
  setSelectedRecipeId(id)
}
 

  // return (
  //  <RecipeList recipes={recipes}
  //  handleRecipeAdd={handleRecipeAdd}
  //  handleRecipeDelete={handleRecipeDelete}
  //  />
  // );


function handleRecipeAdd() {
  const newRecipe = {
    id: uuidv4(),
    name: 'New',
    servings: 1,
    cookTime: '1:00',
    instructions: 'Instr.',
    ingredients: [
      { id: uuidv4(), name: 'Name', amount: '1 Tbs' }
    ]
  }
setSelectedRecipeId(newRecipe.id)
  setRecipes([...recipes, newRecipe])
}


function handleRecipeChange(id, recipe) {
  const newRecipes = [...recipes]
  const index = newRecipes.findIndex(r => r.id === id)
  newRecipes[index] = recipe
  setRecipes(newRecipes)
}

function handleRecipeDelete(id){
  if(selectedRecipeId != null && selectedRecipeId === id) {
    setSelectedRecipeId(undefined)
  }
  setRecipes(recipes.filter(recipe => recipe.id !== id))
}

return (
  <RecipeContext.Provider value={recipeContextValue}>
  <RecipeList recipes={recipes} />
  {selectedRecipe && <RecipeEdit recipe = {selectedRecipe} />}
  </RecipeContext.Provider>
)
}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: "1.45",
    instructions: "  1.Put salt on chicken and\n2.Put chicken in oven\n3.Eat chicken",
    ingredients: [
      {
        id: 1,
      name: 'Chicken',
      amount:'2 Pound'
      },
      {
        id: 2,
      name: 'Salt',
      amount:'1 TBS'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: "0.45",
    instructions: "  1.Put salt on pork and\n2.Put pork in oven\n3.Eat pork",
    ingredients: [
      {
        id: 1,
      name: 'Pork',
      amount:'3 Pound'
      },
      {
        id: 2,
      name: 'Paprica',
      amount:'1 TBS'
      }
    ]
  }
]

export default App;
