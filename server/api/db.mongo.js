const { ServerApiVersion } = require('mongodb');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://javi9davi:123patata@cluster0.2xfgys2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        
        console.log();
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
                { username: findQuery },
                { email: findQuery }
            ]
        });
        return userquery;
    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
        throw err;
    }
};


async function registerUser(username, email, password) {
    const collection = database.collection('user_data');

    try {
        
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            console.log('Username already exists');
            return { success: false, message: 'Username already exists' };
        }

        
        await collection.insertOne({ username, email, password });
        console.log('User registered successfully');
        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

const registerUserData = async (userId, objectiveData, macrosData) => {
    try {
        const collection = database.collection('user_records');

        const filter = { userId: userId };

        const updateDocument = {
            $set: {
                objective: {
                    value: objectiveData.value,
                    kcalObjective: objectiveData.kcalObjective,
                    food: objectiveData.food,
                    exercise: objectiveData.exercise,
                    remaining: objectiveData.remaining
                },
                macros: {
                    value1: macrosData.value,
                    max1: macrosData.max,
                    value2: macrosData.value2,
                    max2: macrosData.max2,
                    value3: macrosData.value3,
                    max3: macrosData.max3
                }
            }
        };

        const options = { upsert: true };
        const result = await collection.updateOne(filter, updateDocument, options);
        return result.upsertedId || result.modifiedCount;
    } catch (error) {
        console.error('Error registering/updating user data:', error);
        throw error;
    }
};

const getUserData = async (userId) => {
    try {
        const collection = database.collection('user_records');
        const userData = await collection.findOne({ userId: userId });
        if (!userData) console.error('No user records found');
        console.log('User data successfully fetched:', userData);
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

module.exports = { getUser, getQuery, registerUser, registerUserData, getUserData };
