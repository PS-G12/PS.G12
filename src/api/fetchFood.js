function fetchFood(query) {
    const apiKey = 'b2GaD1UR7/oiKhAhIIDz+g==CPqBrb1RharNi8wE';

    fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('El resultado para la búsqueda "' + query + '" es:');
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}

// Example usage
fetchFood('3lb carrots and a chicken sandwich');
