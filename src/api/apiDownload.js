import fetch from 'node-fetch';
import fs from 'fs/promises';

async function fetchFoodApi(query) {
  const apiKey = "b2GaD1UR7/oiKhAhIIDz+g==CPqBrb1RharNi8wE";

  try {
    const response = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

async function updateFoodDataFile(foodList) {
  const fileName = 'foodData.json';

  try {
    // Lee el archivo existente o crea una lista vacía
    let existingData = [];
    try {
      const fileContent = await fs.readFile(fileName, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (readError) {
      // El archivo puede no existir, lo cual está bien
    }

    // Ejecuta la función para cada elemento en la lista y agrega los resultados a la lista existente
    for (const foodItem of foodList) {
      try {
        const result = await fetchFoodApi(foodItem);
        existingData.push(result);
        console.log(`Data for ${foodItem}:`, result);
      } catch (error) {
        console.error(`Error fetching data for ${foodItem}:`, error.message);
      }
    }

    // Guarda la lista actualizada en el archivo
    await fs.writeFile(fileName, JSON.stringify(existingData, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error updating food data file:", error.message);
    throw error;
  }
}

// Lista de elementos de ejemplo que son comida
const foodList = [
  // Proteínas
  'Whey Protein Powder',
  'Casein Protein Powder',
  'Plant-Based Protein Powder',
  'Egg White Protein Powder',
  'Greek Yogurt',
  'Cottage Cheese',
  'Chicken Breast',
  'Turkey Breast',
  'Salmon Fillet',
  'Tuna',
  'Lean Beef',
  'Quinoa',
  'Tofu',
  'Tempeh',
  'Edamame',
  'Black Beans',
  'Chickpeas',
  'Lentils',
  'Almonds',
  'Walnuts',
  'Peanuts',
  'Cashews',
  'Chia Seeds',
  'Flaxseeds',
  'Hemp Seeds',
  'Pumpkin Seeds',
  'Cottage Cheese',
  'Greek Yogurt',
  'Eggs',
  'Egg Whites',
  'Low-Fat Cheese',

  // Carbohidratos Complejos
  'Brown Rice',
  'Quinoa',
  'Sweet Potatoes',
  'Oats',
  'Barley',
  'Whole Wheat Pasta',
  'Farro',
  'Bulgur',
  'Beans',
  'Lentils',
  'Chickpeas',
  'Black Beans',
  'Kidney Beans',
  'Green Peas',
  'Whole Grain Bread',
  'Whole Grain Tortillas',
  'Wild Rice',
  'Buckwheat',
  'Amaranth',
  'Millet',
  'Sorghum',

  // Grasas Saludables
  'Avocado',
  'Olive Oil',
  'Coconut Oil',
  'Flaxseed Oil',
  'Chia Oil',
  'Walnut Oil',
  'Almond Butter',
  'Peanut Butter (Natural)',
  'Cashew Butter',
  'Flaxseed',
  'Chia Seeds',
  'Walnuts',
  'Almonds',
  'Pistachios',
  'Sunflower Seeds',
  'Pumpkin Seeds',
  'Fish Oil Supplements',
  'Omega-3-rich Foods',

  // Frutas y Vegetales
  'Berries (Blueberries, Strawberries, Raspberries)',
  'Apples',
  'Bananas',
  'Oranges',
  'Grapefruit',
  'Kiwi',
  'Pineapple',
  'Papaya',
  'Mango',
  'Peaches',
  'Plums',
  'Spinach',
  'Kale',
  'Broccoli',
  'Cauliflower',
  'Carrots',
  'Bell Peppers',
  'Tomatoes',
  'Cucumbers',
  'Zucchini',
  'Asparagus',
  'Brussels Sprouts',
  'Sweet Potatoes',
  'Butternut Squash',
  'Acorn Squash',
  'Eggplant',

  // Snacks Saludables
  'Protein Bars',
  'Protein Shakes',
  'Jerky (Turkey, Beef, or Plant-Based)',
  'Mixed Nuts',
  'Trail Mix',
  'Greek Yogurt with Berries',
  'Hummus with Veggie Sticks',
  'Brown Rice Cakes with Almond Butter',
  'Air-Popped Popcorn',
  'Roasted Chickpeas',
  'Rice Crackers',
  'Edamame',
  'Seaweed Snacks',
  'Low-Fat Cheese Sticks',
  'Chia Pudding',

  // Suplementos
  'Multivitamins',
  'Fish Oil Supplements',
  'Vitamin D Supplements',
  'Calcium Supplements',
  'B12 Supplements',
  'Iron Supplements',
  'Magnesium Supplements',
  'Pre-Workout Supplements',
  'Branched-Chain Amino Acids (BCAAs)',
  'Creatine Monohydrate',
  'Glutamine',
  'Whey Protein Isolate',

  // Bebidas
  'Water',
  'Green Tea',
  'Black Coffee',
  'Herbal Tea',
  'Coconut Water',
  'Almond Milk',
  'Protein Smoothies',
  'Vegetable Juice',
  'Green Juice',

  // ¡Asegúrate de agregar más elementos según sea necesario!
];



// Ejecuta la función para cada elemento en la lista y actualiza el archivo
updateFoodDataFile(foodList);
