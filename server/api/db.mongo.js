const { ServerApiVersion } = require("mongodb");
const { MongoClient } = require("mongodb");
const { use } = require("passport");
const cron = require("node-cron");
require("dotenv").config();
const uri = process.env.MONGO_CLIENT_ID;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const database = client.db("Cluster0");

try {
  cron.schedule("20 23 * * *", async () => {
    const sourceCollection = database.collection("objective_records");
    const targetCollection = database.collection("user_history");

    const sourceData = await sourceCollection.find({}).toArray();

    const filteredData = sourceData.map(doc => {
      const { userId, objectiveData } = doc;
      const { kcalConsumed, proteinsConsumed, fatsConsumed, carbsConsumed, waterAmount, pulseProgression, weightProgression, userLastLogin } = objectiveData;
      
      return {
        userId,
        objectiveData: {
          kcalConsumed,
          proteinsConsumed,
          fatsConsumed,
          carbsConsumed,
          waterAmount,
          pulseProgression,
          weightProgression,
          userLastLogin
        }
      };
    });

    await targetCollection.insertMany(filteredData);

    const insertedData = await targetCollection.countDocuments();

    if (insertedData === sourceData.length) {
      console.log("Data copied successfully");
    }
    else {
      console.log("Could not copy the data");
    }
  });
} catch (error) {
  console.error("Error could not copy the data: ", error);
}

const getQuery = async (collection, findQuery) => {
  try {
    const cursor = await collection.find(findQuery).sort({ name: 1 });
    await cursor.forEach((recipe) => {
      //console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
    });
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
};

const getUser = async (findQuery) => {
  try {
    const collectionName = "user_data";
    const collection = database.collection(collectionName);
    const userquery = await collection.findOne({
      $or: [
        { "userData.username": findQuery },
        { "userData.email": findQuery },
      ],
    });
    if (!userquery){
      console.error('No user found');
      throw Error('Could not find the user');
    }
    if (!userquery){
      console.error('No user found');
      throw Error('Could not find the user');
    }
    return userquery.userData;
  } catch (error) {
    console.error("Something went wrong trying to find the documents: ", error);
    throw error;
  }
};

async function checkUser(username, email) {
  const collection_user = database.collection("user_data");
  //console.log(`Checking ${username} and ${email}`);
  try {
    const existingUser = await collection_user.findOne({
      "userData.username": username,
    });
    if (username) {
      if (existingUser) {
        //console.log('Username already exists');
        return { success: false, message: "Username already exists" };
      }
    } else if (email) {
      const existingEmail = await collection_user.findOne({
        "userData.email": email,
      });
      if (existingEmail) {
        //console.log('Email' + email + 'already exists');
        return { success: false, message: "Email already exists" };
      }
    }
    return { success: true, message: "User available" };
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
}

async function registerUser(formData) {
  const collection_user = database.collection("user_data");
  const collection_records = database.collection("objective_records");
  try {
    const userExists = await checkUser(
      formData.userData.username,
      formData.userData.email
    );
    if (userExists) {
      await collection_user.insertOne({ userData: formData.userData });
      await collection_records.insertOne({
        userId: formData.userData.username,
        objectiveData: formData.objectiveData,
      });
      //console.log('User registered successfully');
      return { success: true, message: "User registered successfully" };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

const getUserData = async (userId) => {
  try {
    const collection = database.collection("objective_records");
    const userData = await collection.findOne({ userId: userId });
    if (!userData) {
      console.error("No user records foundA");
    } else {
      console.log('User data successfully fetched:', userData);
      return userData;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const setUserData = async (userId, food) => {
  try {
    const collection = database.collection("objective_records");
    const userData = await collection.findOne({ userId: userId });
    if (!userData) {
      console.error("No user records found");
      return;
    }
    if (!userData.objectiveData) {
      userData.objectiveData = {};
    }

    if (!userData.objectiveData.foodRecords) {
      userData.objectiveData.foodRecords = [];
    }
    //console.log(food);
    //console.log(userData);

    const calories = parseFloat(food.calorias);
    const proteins = parseFloat(food.protein);
    const fats = parseFloat(food.fatTotal);
    const carbs = parseFloat(food.carbohydratesTotal);

    const validCalories = isNaN(calories) || !isFinite(calories) ? 0 : calories;
    const validProteins = isNaN(proteins) || !isFinite(proteins) ? 0 : proteins;
    const validFats = isNaN(fats) || !isFinite(fats) ? 0 : fats;
    const validCarbs = isNaN(carbs) || !isFinite(carbs) ? 0 : carbs;

    //console.log(validCalories, validProteins, validFats, validCarbs);

    const kcalConsumed =
      isNaN(userData.objectiveData.kcalConsumed) ||
      !isFinite(userData.objectiveData.kcalConsumed)
        ? 0
        : userData.objectiveData.kcalConsumed;
    const proteinsConsumed =
      isNaN(userData.objectiveData.proteinsConsumed) ||
      !isFinite(userData.objectiveData.proteinsConsumed)
        ? 0
        : userData.objectiveData.proteinsConsumed;
    const fatsConsumed =
      isNaN(userData.objectiveData.fatsConsumed) ||
      !isFinite(userData.objectiveData.fatsConsumed)
        ? 0
        : userData.objectiveData.fatsConsumed;
    const carbsConsumed =
      isNaN(userData.objectiveData.carbsConsumed) ||
      !isFinite(userData.objectiveData.carbsConsumed)
        ? 0
        : userData.objectiveData.carbsConsumed;

    const totalCaloriesConsumed =
      Math.round((parseFloat(kcalConsumed) + parseFloat(validCalories)) * 100) /
      100;
    const totalProteinsConsumed =
      Math.round(
        (parseFloat(proteinsConsumed) + parseFloat(validProteins)) * 100
      ) / 100;
    const totalFatsConsumed =
      Math.round((parseFloat(fatsConsumed) + parseFloat(validFats)) * 100) /
      100;
    const totalCarbsConsumed =
      Math.round((parseFloat(carbsConsumed) + parseFloat(validCarbs)) * 100) /
      100;

    userData.objectiveData.foodRecords.push(food);
    await collection.updateOne(
      { userId: userId },
      {
        $set: {
          "objectiveData.foodRecords": userData.objectiveData.foodRecords,
          "objectiveData.kcalConsumed": totalCaloriesConsumed,
          "objectiveData.proteinsConsumed": totalProteinsConsumed,
          "objectiveData.fatsConsumed": totalFatsConsumed,
          "objectiveData.carbsConsumed": totalCarbsConsumed,
        },
      }
    );

    return userData;
  } catch (error) {
    console.error("Error fetching/updating user data:", error);
    throw error;
  }
};
const addNewFood = async (userId, food) => {
  try {
    const collection = database.collection("objective_records");
    const userData = await collection.findOne({ userId: userId });
    if (!userData) {
      console.error("No user records found");
      return;
    }
    if (!userData.objectiveData.ownFood) {
      userData.objectiveData.ownFood = [];
    }
    userData.objectiveData.ownFood.push(food);
    //console.log(userData.objectiveData.ownFood);

    await collection.updateOne(
      { userId: userId },
      {
        $set: {
          "objectiveData.ownFood": userData.objectiveData.ownFood,
        },
      }
    );

    return 1;
  } catch (error) {
    console.error("Error fetching/updating user data:", error);
    throw error;
  }
};

const deleteFood = async (userId, foodName, meal) => {
  try {
    console.log("Este es el nombre de la comida a eliminar ", foodName);
    console.log("Este es el tipo de comida a eliminar ", meal);

    const collection = database.collection("objective_records");
    const userData = await collection.findOne({ userId: userId });
    if (!userData) {
      console.error("No user records found");
      return;
    }



    userData.objectiveData.foodRecords = userData.objectiveData.foodRecords.filter(
      (item) => item.nombre !== foodName && item.typeComida !== meal
    );
    
    console.log(userData.objectiveData.foodRecords);
    
    await collection.updateOne(
      { userId: userId },
      {
        $set: {
          "objectiveData.foodRecords": userData.objectiveData.foodRecords,
        },
      }
    );

    return 1;
  } catch (error) {
    console.error("Error fetching/updating user data:", error);
    throw error;
  }
}

const searchOwnFood = async (user, query) => {
  const foundItems = [];
  try {
    const collection = database.collection("objective_records");
    const userData = await collection.findOne({ userId: user });
    if (!userData) {
      console.error("No user records found");
      return foundItems;
    }
    if (!userData.objectiveData || !userData.objectiveData.ownFood) {
      return foundItems;
    }
    
    for (const item of userData.objectiveData.ownFood) {
      if (
        item.name.toLowerCase().startsWith(query) &&
        !foundItems.some((foundItem) => foundItem.name === item.name)
      ) {
        foundItems.push(item);
      }
    }
  } catch (error) {
    console.error("Error finding matching items:", error);
    throw error;
  }

  return foundItems;
};



const registerUserDataPulse = async (pulseDate, pulse, user) => {
  try {
    const collection = database.collection("objective_records");
    const userResult = await collection.findOne({ userId: user });
    if (!userResult) {
      console.error("No user records found");
      return null;
    }

    const pulseProgression = userResult.objectiveData.pulseProgression || {};
    pulseProgression[pulseDate] = pulse;
    const sortedPulseProgression = Object.entries(pulseProgression).sort(
      (a, b) => new Date(a[0]) - new Date(b[0])
    );
    const sortedPulseProgressionObj = Object.fromEntries(
      sortedPulseProgression
    );

    const actualizacion = {
      $set: { "objectiveData.pulseProgression": sortedPulseProgressionObj },
    };
    await collection.updateOne({ userId: user }, actualizacion);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const registerUserDataWeight = async (weightDate, weight, user) => {
  try {
    const collection = database.collection("objective_records");
    const userResult = await collection.findOne({ userId: user });
    if (!userResult) {
      console.error("No user records found");
      return null;
    }

    const weightProgression = userResult.objectiveData.weightProgression || {};
    weightProgression[weightDate] = weight;
    const sortedWeightProgression = Object.entries(weightProgression).sort(
      (a, b) => new Date(a[0]) - new Date(b[0])
    );
    const sortedWeightProgressionObj = Object.fromEntries(
      sortedWeightProgression
    );

    const actualizacion = {
      $set: { "objectiveData.weightProgression": sortedWeightProgressionObj },
    };
    await collection.updateOne({ userId: user }, actualizacion);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const registerUserDataWater = async (waterAmount, user) => {
    try {
      const collection = database.collection("objective_records");
      const userResult = await collection.findOne({ userId: user });
      if (!userResult) {
        console.error("No user records found");
        return null;
      }

      const actualizacion = {
        $set: { "objectiveData.waterAmount": userResult.objectiveData.waterAmount + waterAmount },
      };
      await collection.updateOne({ userId: user }, actualizacion);
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  
  

const getUserWeightHeight = async (username) => {
  try {
    const collection = database.collection("user_data");
    const userResult = await collection.findOne({
      "userData.username": username,
    });
    if (!userResult) {
      console.error("No user records foundB");
      return null;
    }
    const { weight, height } = userResult.userData;
    //console.log('User data successfully fetched:', userResult);
    return { weight, height };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const getUserMacros = async (username) => {
  try {
    const collection = database.collection("user_data");
    const result = await collection.findOne({ "userData.username": username });
    if (!result) {
      console.error("No user records foundC");
      return null;
    }
    const { weight, height, age, gender, activityLevel, fitnessGoal } =
      result.userData;
    //console.log('User data successfully fetched: ', result);
    return { weight, height, age, gender, activityLevel, fitnessGoal };
  } catch (error) {
    console.error("Error while fetching user macros: ", error);
    throw error;
  }
};

const getPrevUserData = async (user) => {
  try {
    const collection = database.collection("user_data");
    const result = await collection.findOne({ "userData.username": user });
    if (!result) {
      console.error("No user records foundD");
      return null;
    }
    //console.log('User data successfully fetched: ', result);
    return result.userData;
  } catch (error) {
    console.error("Error while getting the users data: ", error);
    throw error;
  }
};

const getUserInfo = async (user) => {
    try{
        const collection = database.collection("user_data");
        const info = await collection.findOne({"userData.username": user});
        if (!info){
            console.error("No user records found");
            return null;
        }
        //console.log("Returning users data...");
        return info;
    }
    catch (error){
        console.error("Error while updating the users data: ", error)
        throw error;
    }
}

const resetProgress = async (user) => {
  try {
    const collection = database.collection("objective_records");
    const result = await collection.findOne({ "userId": user });
    if (!result) {
      console.error("No user records found");
      return null;
    }
    const objectiveData = result.objectiveData; 
    const userLastLogin = objectiveData ? objectiveData.userLastLogin : null;
    const currentDate = new Date();
    if (userLastLogin) {
      const lastLoginDate = new Date(userLastLogin);
      if (
        lastLoginDate.getDate() === currentDate.getDate() &&
        lastLoginDate.getMonth() === currentDate.getMonth() &&
        lastLoginDate.getFullYear() === currentDate.getFullYear()
      ) {
        //console.log("El último inicio de sesión ocurrió hoy.");
      } else {
        //console.log("El último inicio de sesión no ocurrió hoy.");
        result.objectiveData.proteinsConsumed = 0;
        result.objectiveData.kcalConsumed = 0;
        result.objectiveData.carbsConsumed = 0;
        result.objectiveData.fatsConsumed = 0;
        result.objectiveData.waterAmount = 0;       

        result.foodRecords? result.foodRecords = [] || null : null;
      
      }
    }
    result.objectiveData = {
      ...objectiveData,
      userLastLogin: currentDate.toISOString(),
    };
    //console.log("result");
    //console.log(result);
    await collection.updateOne(
      { "userId": user },
      { $set: { "objectiveData": result.objectiveData } }
    );
    return 1;
  } catch (error) {
    console.error("Error while getting the user's data: ", error);
    throw error;
  }
};

const updateUsername = async (user, username) => {
  try{
    const collection = database.collection('user_data');
    const document = await collection.findOne({"userData.username": user});
    const collectionToExpand = database.collection('objective_records');
    const documentToExpand = await collectionToExpand.findOne({userId: user});
  
    if (!document || !documentToExpand){
      console.error("No user records found");
      return false;
    }
  
    update = {
      $set: {"userData.username": username}
    };

    expandUpdate = {
      $set: {userId: username}
    };
  
    const updateExpansion = await collectionToExpand.updateOne({userId: user}, expandUpdate);
    if (updateExpansion.modifiedCount === 1){
      const result = await collection.updateOne({"userData.username":user}, update);
      if (result.modifiedCount === 1){
        console.log("Username updated");
        return true;
      }
      else{
        console.error("Could not update the username");
        return false
      }
    }
    else{
      console.error("Could not update expand the update to the other collection");
      return false;
    }
  }
  catch (error){
    console.error("Run into an error updating the username: ", error);
    throw error;
  }
};

const updateMail = async (user, email) => {
  try{
    const collection = database.collection('user_data');
    const document = await collection.findOne({"userData.username": user});
  
    if (!document){
      console.error("No user records found");
      return false;
    }
  
    update = {
      $set: {"userData.email": email}
    };
  
    const result = await collection.updateOne({"userData.username":user}, update);
    if (result.modifiedCount === 1){
      console.log("Email updated");
      return true;
    }
    console.error("Could not update the email");
    return false;
  }
  catch (error){
    console.error("Run into an error updating the email: ", error);
    throw error;
  }
};

const updateWeight = async (user, weight) => {
  try{
    const collection = database.collection('user_data');
    const document = await collection.findOne({"userData.username": user});
  
    if (!document){
      console.error("No user records found");
      return false;
    }
  
    update = {
      $set: {"userData.weight": weight}
    };
  
    const result = await collection.updateOne({"userData.username":user}, update);
    if (result.modifiedCount === 1){
      console.log("Weight updated");
      return true;
    }
    console.error("Could not update the weight");
    return false;
  }
  catch (error){
    console.error("Run into an error updating the weight: ", error);
    throw error;
  }
};

const updateHeight = async (user, height) => {
  try{
    const collection = database.collection('user_data');
    const document = await collection.findOne({"userData.username": user});
  
    if (!document){
      console.error("No user records found");
      return false;
    }
  
    update = {
      $set: {"userData.height": height}
    };
  
    const result = await collection.updateOne({"userData.username":user}, update);
    if (result.modifiedCount === 1){
      console.log("Height updated");
      return true;
    }
    console.error("Could not update the height");
    return false;
  }
  catch (error){
    console.error("Run into an error updating the height: ", error);
    throw error;
  }
};

const updateAge = async (user, age) => {
  try{
    const collection = database.collection('user_data');
    const document = await collection.findOne({"userData.username": user});
  
    if (!document){
      console.error("No user records found");
      return false;
    }
  
    update = {
      $set: {"userData.age": age}
    };
  
    const result = await collection.updateOne({"userData.username":user}, update);
    if (result.modifiedCount === 1){
      console.log("Age updated");
      return true;
    }
    console.error("Could not update the age");
    return false;
  }
  catch (error){
    console.error("Run into an error updating the age: ", error);
    throw error;
  }
};

const updateCal = async (user, cal) => {
  try{
    const collection = database.collection('objective_records');
    const document = await collection.findOne({userId: user});
  
    if (!document){
      console.error("No user records found");
      return false;
    }
  
    update = {
      $set: {"objectiveData.kcalObjective": cal}
    };
  
    const result = await collection.updateOne({userId:user}, update);
    if (result.modifiedCount === 1){
      console.log("Kcal Objective updated");
      return true;
    }
    console.error("Could not update the Kcal Objective");
    return false;
  }
  catch (error){
    console.error("Run into an error updating the Kcal Objective: ", error);
    throw error;
  }
};

const updateGender = async (user, gender) => {
  try{
    const collection = database.collection('user_data');
    const document = await collection.findOne({"userData.username": user});
  
    if (!document){
      console.error("No user records found");
      return false;
    }
  
    update = {
      $set: {"userData.gender": gender}
    };
  
    const result = await collection.updateOne({"userData.username":user}, update);
    if (result.modifiedCount === 1){
      console.log("Gender updated");
      return true;
    }
    console.error("Could not update the gender");
    return false;
  }
  catch (error){
    console.error("Run into an error updating the gender: ", error);
    throw error;
  }
};

const updatePass = async (user, password) => {

  try {

    const collection = database.collection('user_data');
    const document = await collection.findOne({"userData.username": user});
    
    if (!document){
      console.error("No user records found");
      return false;
    }
  
    const update = {
      $set: {"userData.password": password}
    };
    
    const result = await collection.updateOne({"userData.username":user}, update);

    if (result.modifiedCount === 1){
      console.log("Password updated");
      return true;
    }

    console.error("Could not update the password");
    return false;
  } catch (error) {
    console.error("Run into an error updating the password: ", error);
    throw error;
  }

}

const updatePfp = async (user, newPfp) => {
  try{
    console.log("hola", user);
    console.log(newPfp);
    const collection = database.collection('user_data');
    const document = await collection.findOne({"userData.username": user});
    console.log("puta", document)

    if (!document){
      console.error("No users found");
      return false;
    }

    const update = {
      $set: {"userData.pfp": newPfp}
    };

    const result = await collection.updateOne({"userData.username": user}, update)

    if (result.modifiedCount === 1){
      console.log("Profile picture updated");
      return true;
    }

    console.error("Could not update the profile picture");
    return false
  }
  catch (error){
    console.error("Run into an error while updating the users profile picture");
    throw error;
  }
};

const getHistory = async (user) => {
  try {
    const collection = database.collection("user_history");
    const userData = await collection.find({ userId: user }).toArray();
    if (!userData) {
      console.error("No user records foundA");
    }
    else {
      console.log('User data successfully fetched:', userData);
      return userData;
    }
  }
  catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

module.exports = {
  getUser,
  getQuery,
  registerUser,
  getUserData,
  checkUser,
  getUserWeightHeight,
  getUserMacros,
  getPrevUserData,
  setUserData,
  registerUserDataPulse,
  registerUserDataWeight,
  registerUserDataWater,
  resetProgress,
  getUserInfo,
  addNewFood,
  searchOwnFood,
  updateUsername,
  updateMail,
  updateWeight,
  updateHeight,
  updateAge,
  updateCal,
  updateGender,
  updatePass,
  updatePfp,
  getHistory, 
  deleteFood
};
