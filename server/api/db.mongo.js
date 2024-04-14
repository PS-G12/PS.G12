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
            console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
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
        return userquery.userData;
    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
        throw err;
    }
};

async function checkUser(username, email) {
    const collection_user = database.collection('user_data');
    try {
      const existingUser = await collection_user.findOne({ username });
      if (username){
        if (existingUser) {
        console.log('Username already exists');
        return { success: false, message: 'Username already exists' };}
      }
      else if (email){
        const existingEmail = await collection_user.findOne({ email });
        if (existingEmail) {
            console.log('Email' + email + 'already exists');
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
    const collection_records = database.collection('user_records');
    try {
        
        const existingUser = await collection_user.findOne({ username: formData.userData.username });
        if (existingUser) {
            console.log('Username already exists');
            return { success: false, message: 'Username already exists' };
        }

        
        await collection_user.insertOne({ userData: formData.userData });
        await collection_records.insertOne({ userId: formData.userData.username, objectiveData: formData.objectiveData, macrosData: formData.macrosData });
        console.log('User registered successfully');
        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

const getUserData = async (userId) => {
    try {
        const collection = database.collection('user_records');
        const userData = await collection.findOne({ userId: userId });
        if (!userData){
            console.error('No user records found');
        }
        else{
            console.log('User data successfully fetched:', userData);
            return userData;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const getUserWeightHeight = async (username) => {
    try {
        const collection = database.collection('user_data');
        const userResult = await collection.findOne({ "userData.username": username });
        if (!userResult) {
            console.error('No user records found');
            return null;
        }
        const { weight, height } = userResult.userData;
        console.log('User data successfully fetched:', userResult);
        return { weight, height };
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};



module.exports = { getUser, getQuery, registerUser, getUserData, checkUser, getUserWeightHeight };