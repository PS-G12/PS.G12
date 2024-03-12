import jsonData from './foodData.json';

async function fetchFood(query) {
  try {
    const searchQueryNormalized = query.trim().toLowerCase();

    for (const category of jsonData) {
      for (const item of category.items) {
        if (item.name === searchQueryNormalized) {
          return Promise.resolve(item);
        }
      }
    }

    // Si no se encuentra el elemento
    return Promise.resolve(null);
  } catch (error) {
    // Manejar errores aquí si es necesario
    console.error("Error al buscar alimentos:", error.message);
    return Promise.reject(error);
  }
}

export default fetchFood;
