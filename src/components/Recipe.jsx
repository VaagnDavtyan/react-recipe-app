import React, { useContext, useEffect } from 'react'
import IngredientList from './IngredientList'
import { RecipeContext } from './App'

export default function Recipe(props) {
const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext)
    const { 
        id,
        name,
        cookTime,
        servings, 
        instructions,
        ingredients,
    } = props

    useEffect(() => {
        console.log('render')
        return () =>{
            console.log('unmiunt')
        }
    }, [])


return (
        <div className="recipe">
            <div className="recipe__header">
                <h3 className="recipe__title">{name}</h3>
               <div>
                   <button className="edit-btn" onClick={() => handleRecipeSelect(id)}>Edit</button>
                   <button onClick={() => handleRecipeDelete(id)} className="delete-btn">Delete</button>
               </div>
            </div>
            <div className="recipe__row">
                 <span className="recipe__label">Cook Time:</span>
                <span className="recipe__value">{cookTime}</span>
            </div>
            <div className="recipe__row">
                <span className="recipe__label">Servings</span>
                <span className="recipe__value">{servings}</span>
            </div>
            <div className="recipe__row">
                <span className="recipe__label">Instructions</span>
                <div className="recipe__value">
                   {instructions}
                </div>
            </div>
            <div className="recipe__row">
                <span className="recipe__label">Ingredient</span>
                <div className="recipe__value">
      <IngredientList ingredients={ingredients} />
                </div>
            </div>
           
        </div>
    )
}


