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


module.exports = { getUser, getQuery, registerUser };
