import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import uuidv4 from 'uuid/v4'

function RecipeEdit({ recipe }) {
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

    function handleChange(changes) {
       handleRecipeChange(recipe.id, {...recipe, ...changes})
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients })
    }
     
function handleIngredientAdd() {
    const newIngredients = {
        id: uuidv4(), 
        name: '',
        amount: ''
    }
    handleChange({ ingredients: [recipe.ingredients, newIngredients]})
}


function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter(i => i.id !== id)
    })
  }

    // handleChange({ name: 'New Name'})

    return (
        <div className='recipe-edit'>
            <div className='recipe-edit__remove-button-container'>
                <button onClick={() => handleRecipeSelect(undefined)} className='btn-recipe-edit-remove-button'>&times;</button>
                </div>
                <div  className='recipe-edit__details-grid'>
                    <label className='recipe-edit-label' htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' className='recipe-edit__input' value={recipe.name} onChange={e => handleChange({ name: e.target.value  })}/>
                    <label htmlFor='cookTime' className='recipe-edit-label'>Cook Time</label>
                    <input type='text' name='cookTime' id='cookTime' className='recipe-edit__input' value={recipe.cookTime} onChange={e => handleChange({ cookTime: e.target.value  })}/>
                    <label htmlFor='servings' className='recipe-edit-label'>Servings</label>
                    <input type='number' min='1' name='servings' id='servings' className='recipe-edit__input' value={recipe.servings} onChange={e => handleChange({ servings: parseInt(e.target.value) || 'not number'  })}/>
                    <label htmlFor='instructions' className='recipe-edit-label'>Instructions</label>
                    <textarea name='instructions' id='instructions' className='recipe-instructions' onChange={e => handleChange({ instructions: e.target.value })}>{recipe.instructions}</textarea>
                </div>
                <br />
                <label className='recipe-edit__label'>Ingredients</label>
                <div className='recipe-edit__ingredient-grid'>
                <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map(ingredient => (
          <RecipeIngredientEdit
            key={ingredient.id}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            ingredient={ingredient}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
                </div>
        </div>
    )
}

export default RecipeEdit
