const { ServerApiVersion } = require('mongodb');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_CLIENT_ID;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const database = client.db("Cluster0");

const getQuery = async (collection, findQuery) => {
    try {
        const cursor = await collection.find(findQuery).sort({ name: 1 });
        await cursor.forEach(recipe => {
            //console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
        });
        
    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
    }
};

const getUser = async (findQuery) => {
    try {
        const collectionName = "user_data";
        const collection = database.collection(collectionName);
        const userquery = await collection.findOne({
            $or: [
                { "userData.username": findQuery },
                { "userData.email": findQuery }
            ]
        });
        if (!userquery) throw err;
        return userquery.userData;
    } catch (error) {
        console.error("Something went wrong trying to find the documents: ", error);
        throw error;
    }
};

async function checkUser(username, email) {
    const collection_user = database.collection('user_data');
    //console.log(`Checking ${username} and ${email}`);
    try {
      const existingUser = await collection_user.findOne({ "userData.username": username });
      if (username){
        if (existingUser) {
        //console.log('Username already exists');
        return { success: false, message: 'Username already exists' };}
      }
      else if (email){
        const existingEmail = await collection_user.findOne({ "userData.email": email });
        if (existingEmail) {
            //console.log('Email' + email + 'already exists');
            return { success: false, message: 'Email already exists' };
        }
      }
        return { success: true, message: 'User available' };
    } catch (error) {
      console.error('Error checking user:', error);
      throw error;
    }
}

async function registerUser(formData) {
    const collection_user = database.collection('user_data');
    const collection_records = database.collection('objective_records');
    try {
        const userExists = await checkUser(formData.userData.username, formData.userData.email);
        if (userExists){
            await collection_user.insertOne({ userData: formData.userData });
            await collection_records.insertOne({ userId: formData.userData.username, objectiveData: formData.objectiveData });
            //console.log('User registered successfully');
            return { success: true, message: 'User registered successfully' };
        }
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

const getUserData = async (userId) => {
    try {
        const collection = database.collection('objective_records');
        const userData = await collection.findOne({ userId: userId });
        if (!userData){
            console.error('No user records foundA');
        }
        else{
            //console.log('User data successfully fetched:', userData);
            return userData;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const setUserData = async (userId, food) => {
    try {
        const collection = database.collection('objective_records');
        const userData = await collection.findOne({ userId: userId });
        if (!userData){
            console.error('No user records found');
            return;
        }
        if (!userData.objectiveData) {
            userData.objectiveData = {};
        }
        
        if (!userData.objectiveData.foodRecords) {
            userData.objectiveData.foodRecords = [];
        }
        console.log(food);
        console.log(userData);

        const calories = parseFloat(food.calorias);
        const proteins = parseFloat(food.protein);
        const fats = parseFloat(food.fatTotal);
        const carbs = parseFloat(food.carbohydratesTotal);
        
        const validCalories = isNaN(calories) || !isFinite(calories) ? 0 : calories;
        const validProteins = isNaN(proteins) || !isFinite(proteins) ? 0 : proteins;
        const validFats = isNaN(fats) || !isFinite(fats) ? 0 : fats;
        const validCarbs = isNaN(carbs) || !isFinite(carbs) ? 0 : carbs;

        console.log(validCalories, validProteins, validFats, validCarbs);

        const kcalConsumed = isNaN(userData.objectiveData.kcalConsumed) || !isFinite(userData.objectiveData.kcalConsumed) ? 0 : userData.objectiveData.kcalConsumed;
        const proteinsConsumed = isNaN(userData.objectiveData.proteinsConsumed) || !isFinite(userData.objectiveData.proteinsConsumed) ? 0 : userData.objectiveData.proteinsConsumed;
        const fatsConsumed = isNaN(userData.objectiveData.fatsConsumed) || !isFinite(userData.objectiveData.fatsConsumed) ? 0 : userData.objectiveData.fatsConsumed;
        const carbsConsumed = isNaN(userData.objectiveData.carbsConsumed) || !isFinite(userData.objectiveData.carbsConsumed) ? 0 : userData.objectiveData.carbsConsumed;

        const totalCaloriesConsumed = Math.round((parseFloat(kcalConsumed) + parseFloat(validCalories)) * 100) / 100;
        const totalProteinsConsumed = Math.round((parseFloat(proteinsConsumed) + parseFloat(validProteins)) * 100) / 100;
        const totalFatsConsumed = Math.round((parseFloat(fatsConsumed) + parseFloat(validFats)) * 100) / 100;
        const totalCarbsConsumed = Math.round((parseFloat(carbsConsumed) + parseFloat(validCarbs)) * 100) / 100;



        userData.objectiveData.foodRecords.push(food);
        await collection.updateOne(
            { userId: userId },
            { $set: { 
                "objectiveData.foodRecords": userData.objectiveData.foodRecords, 
                "objectiveData.kcalConsumed": totalCaloriesConsumed, 
                "objectiveData.proteinsConsumed": totalProteinsConsumed, 
                "objectiveData.fatsConsumed": totalFatsConsumed,
                "objectiveData.carbsConsumed": totalCarbsConsumed
            } }
        );
        
        return userData;
    } catch (error) {
        console.error('Error fetching/updating user data:', error);
        throw error;
    }
};

const registerUserDataPulse = async (pulseDate, pulse, user) => {
    try {
        const collection = database.collection('objective_records');
        const userResult = await collection.findOne({ "userId": user });
        if (!userResult) {
            console.error('No user records found');
            return null;
        }
        
        const pulseProgression = userResult.objectiveData.pulseProgression || {}; 
        pulseProgression[pulseDate] = pulse;
        const sortedPulseProgression = Object.entries(pulseProgression).sort((a, b) => new Date(a[0]) - new Date(b[0]));
        const sortedPulseProgressionObj = Object.fromEntries(sortedPulseProgression);

        const actualizacion = { $set: { 'objectiveData.pulseProgression': sortedPulseProgressionObj } };
        await collection.updateOne({ "userId": user }, actualizacion);  
             
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const registerUserDataWeight = async (weightDate, weight, user) => {
    try {
        const collection = database.collection('objective_records');
        const userResult = await collection.findOne({ "userId": user });
        if (!userResult) {
            console.error('No user records found');
            return null;
        }
        
        const weightProgression = userResult.objectiveData.weightProgression || {}; 
        weightProgression[weightDate] = weight;
        const sortedWeightProgression = Object.entries(weightProgression).sort((a, b) => new Date(a[0]) - new Date(b[0]));
        const sortedWeightProgressionObj = Object.fromEntries(sortedWeightProgression);

        const actualizacion = { $set: { 'objectiveData.weightProgression': sortedWeightProgressionObj } };
        await collection.updateOne({ "userId": user }, actualizacion);

    }
    catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const getUserWeightHeight = async (username) => {
    try {
        const collection = database.collection('user_data');
        const userResult = await collection.findOne({ "userData.username": username });
        if (!userResult) {
            console.error('No user records foundB');
            return null;
        }
        const { weight, height } = userResult.userData;
        //console.log('User data successfully fetched:', userResult);
        return { weight, height };
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const getUserMacros = async (username) => {
    try{
        const collection = database.collection('user_data');
        const result = await collection.findOne({"userData.username": username});
        if (!result){
            console.error('No user records foundC');
            return null;
        }
        const { weight, height, age, gender, activityLevel, fitnessGoal } = result.userData;
        //console.log('User data successfully fetched: ', result);
        return { weight, height, age, gender, activityLevel, fitnessGoal };
    }
    catch (error){
        console.error('Error while fetching user macros: ', error);
        throw error;
    }
};

const getPrevUserData = async (user) => {
    try{
        console.log(user);
        const collection = database.collection('user_data');
        const result = await collection.findOne({"userData.username":user});
        if (!result){
            console.error('No user records foundD');
            return null;
        }
        //console.log('User data successfully fetched: ', result);
        return result.userData;
    }
    catch (error){
        console.error('Error while getting the users data: ', error);
        throw error;
    }
};

const updateUser = async (formData, user) => {
    try{
        const collection = database.collection('user_data');
        const collection_to_expand = database.collection('objective_records');
        const document = collection.findOne({"userData.username": user});
        if (!document){
            console.error('No user records foundE');
            return null
        }

        let updateCases = [0, 0, 0];
        updateCases[0] = (formData.userData.username !== "") + 0;
        updateCases[1] = (formData.userData.password !== "") + 0;
        updateCases[2] = (formData.userData.email !== "") + 0;
        console.log("Update case: ",updateCases.join(''));
        let updateDocument;
        switch (updateCases.join('')){
                //UPE
            case '000':
                console.error('Nothing to update');
                break;
            case '001':
                updateDocument = {
                    $set: {"userData.email": formData.userData.email}
                };
                break;
            case '010':
                updateDocument = {
                    $set: {"userData.password": formData.userData.password}
                };
                break;
            case '011':
                updateDocument = {
                    $set: {"userData.password": formData.userData.password, "userData.email": formData.userData.email}
                };
                break;
            case '100':
                updateDocument = {
                    $set: {"userData.username": formData.userData.username}
                };
                break;
            case '101':
                updateDocument = {
                    $set: {"userData.username": formData.userData.username, "userData.email": formData.userData.email}
                };
                break;
            case '110':
                updateDocument = {
                    $set: {"userData.username": formData.userData.username, "userData.password": formData.userData.password}
                };
                break;
            case '111':
                updateDocument = {
                    $set: {"userData.username": formData.userData.username, "userData.password": formData.userData.password, "userData.email": formData.userData.email}
                };
                break;
        }

        if (!updateDocument){
            return null;
        }
        const result = await collection.updateOne({"userData.username": user}, updateDocument);
        let modifiedCollectiontoExpand = false;
        if (formData.userData.username){
            const expandUpdate = {
                $set:{userId: formData.userData.username}
            }
            const expandUpdateToCollection = await collection_to_expand.updateOne({userId: user}, expandUpdate);
            if (expandUpdateToCollection.modifiedCount === 1){
                modifiedCollectiontoExpand = true;
            }
        }
        
        if (result.modifiedCount === 1 && modifiedCollectiontoExpand){
            console.log('Update and update expansion were successfull');
            return modifiedCollectiontoExpand;
        }
        else if (result.modifiedCount === 1){
            console.log('Update was successful');
            return modifiedCollectiontoExpand;
        }
        else{
            //console.log('Something went wrong updating the user');
        }
    }
    catch (error){
        console.error('Error while updating the users data: ', error);
        throw error;
    }
};



module.exports = { getUser, getQuery, registerUser, getUserData, checkUser, getUserWeightHeight, getUserMacros, getPrevUserData, updateUser, setUserData,  registerUserDataPulse, registerUserDataWeight };
