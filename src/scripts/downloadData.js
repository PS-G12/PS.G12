const apiKey = 'dffaab109emsh61ec48dc8bf3445p129e05jsn4f3d29a5dae3';

fetch('https://exercisedb.p.rapidapi.com/exercises?limit=2000', {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
})
.then(response => response.json())
.then(data => {
  const jsonData = JSON.stringify(data);
  downloadJSON(jsonData, 'exercise_data.json');
})
.catch(error => {
  console.error('Error fetching data:', error);
});

function downloadJSON(data, filename) {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}