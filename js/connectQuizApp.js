const { MongoClient } = require('mongodb');

// MongoDB connection URI (update with your actual connection string)
const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/quizApp?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToQuizApp() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to MongoDB!");

        // Access the quizApp database and questions collection
        const database = client.db('quizApp');
        const questionsCollection = database.collection('questions');

        // Example: Fetch all documents in the questions collection
        const questions = await questionsCollection.find({}).toArray();
        console.log("Questions:", questions);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        // Close the client
        await client.close();
    }
}

connectToQuizApp();
