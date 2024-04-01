import jsonData from './foodData.json';

async function fetchFood(query) {
  try {
    const searchQueryNormalized = query.trim().toLowerCase();
    const searchWords = searchQueryNormalized.split(/\s+/);

    const foundItems = [];

    for (const category of jsonData) {
      for (const item of category.items) {
        if (
          searchWords.some(
            (searchWord) =>
              item.name.toLowerCase().startsWith(searchWord) &&
              !foundItems.some((foundItem) => foundItem.name === item.name)
          )
        ) {
          foundItems.push(item);
        }
      }
    }

    return Promise.resolve({ items: foundItems });
  } catch (error) {
    console.error("Error al buscar alimentos:", error.message);
    return Promise.reject(error);
  }
}

export default fetchFood;
