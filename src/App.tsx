import React, { useState } from 'react'
import { ChefHat } from 'lucide-react'
import IngredientInput from './components/IngredientInput'
import RecipeList from './components/RecipeList'
import { getRecipes } from './api/gemini'

function App() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [recipes, setRecipes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleAddIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient])
  }

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleGetRecipes = async () => {
    setLoading(true)
    try {
      const recipeList = await getRecipes(ingredients)
      setRecipes(recipeList)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setRecipes([])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
          <ChefHat className="mr-2" /> Recipe Finder
        </h1>
        <IngredientInput
          onAddIngredient={handleAddIngredient}
          ingredients={ingredients}
          onRemoveIngredient={handleRemoveIngredient}
        />
        <button
          onClick={handleGetRecipes}
          disabled={ingredients.length === 0 || loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors mt-4 disabled:bg-gray-400"
        >
          {loading ? 'Finding Recipes...' : 'Get Recipes'}
        </button>
        <RecipeList recipes={recipes} />
      </div>
    </div>
  )
}

export default App