const express = require('express');
const exerciseData = require('./api/exercise_data_en.json');
const path = require('path');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const app = express();

app.use('/gifs', express.static(path.join(__dirname, 'gifs')));

app.get('/api/exercises', (req, res) => {
  const { search, bodyPart, perPage, page } = req.query;
  const cacheKey = JSON.stringify(req.query);

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  let filteredExercises = exerciseData;

  if (search) {
    filteredExercises = filteredExercises.filter(exercise =>
      exercise.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (bodyPart) {
    filteredExercises = filteredExercises.filter(exercise =>
      exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
    );
  }

  if (!page) {
    let samples = {};
    const uniqueBodyParts = [...new Set(filteredExercises.map(exercise => exercise.bodyPart))];
    uniqueBodyParts.forEach(bodyPart => {
      const exercisesForBodyPart = filteredExercises.filter(exercise => exercise.bodyPart === bodyPart);
      samples[bodyPart] = exercisesForBodyPart.slice(0, 5);
    });
    const data = { samples };

    cache.set(cacheKey, data, 5 * 60);
    return res.json(data);
  }
  
  const perPage_fix = perPage && perPage > 0 && perPage < 100 ? parseInt(perPage) : 10;
  const currentPage = page && page > 0 ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const results = filteredExercises.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredExercises.length / perPage_fix);
  const data = { results, totalPages };
  cache.set(cacheKey, data, 5 * 60);
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
