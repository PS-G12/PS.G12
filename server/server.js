const express = require('express');
const app = express();
const exerciseData = require('./api/exercise_data_en.json');

app.get('/api/exercises', (req, res) => {
  const { search, bodyPart, limit, page } = req.query;

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
    const samples = {};
    console.log("samples");
    const uniqueBodyParts = [...new Set(filteredExercises.map(exercise => exercise.bodyPart))];
    uniqueBodyParts.forEach(bodyPart => {
      const exercisesForBodyPart = filteredExercises.filter(exercise => exercise.bodyPart === bodyPart);
      samples[bodyPart] = exercisesForBodyPart.slice(0, 5);
    });
    return res.json(samples);
  }

  const perPage = limit && limit > 0 && limit < 100 ? parseInt(limit) : 10;
  const currentPage = page && page > 0 ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const results = filteredExercises.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredExercises.length / perPage);

  res.json({ results, totalPages });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
