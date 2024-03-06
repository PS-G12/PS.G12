async function fetchFood(query) {
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
    //console.log(JSON.stringify(jsonData));

    return jsonData;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default fetchFood;
