import axios from 'axios'

const API_KEY = 'sample' // Replace with your actual Gemini API key

export const getRecipes = async (ingredients: string[]): Promise<string[]> => {
  const prompt = `Given the following ingredients: ${ingredients.join(
    ', '
  )}, suggest 3 recipes that can be made using some or all of these ingredients. Beyond these ingredients, you can only assume availability of basic ingredients such as salt, pepper, and not much else. For each recipe, provide a title, an ingredients list, and step-by-step instructions. Format the output in markdown.`

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY,
        },
      }
    )

    const generatedText = response.data.candidates[0].content.parts[0].text
    return generatedText.split('\n\n').filter((recipe: string) => recipe.trim() !== '')
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw error
  }
}