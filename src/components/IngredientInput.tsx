import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface IngredientInputProps {
  onAddIngredient: (ingredient: string) => void
  ingredients: string[]
  onRemoveIngredient: (index: number) => void
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  onAddIngredient,
  ingredients,
  onRemoveIngredient,
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAddIngredient(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter an ingredient"
          className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-full py-1 px-3 flex items-center"
          >
            <span>{ingredient}</span>
            <button
              onClick={() => onRemoveIngredient(index)}
              className="ml-2 text-gray-600 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IngredientInput