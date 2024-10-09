import React from 'react'
import ReactMarkdown from 'react-markdown'

interface RecipeListProps {
  recipes: string[]
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  if (recipes.length === 0) {
    return null
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Recipes</h2>
      {recipes.map((recipe, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <ReactMarkdown className="prose prose-sm max-w-none">
            {recipe}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  )
}

export default RecipeList