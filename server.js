const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";

const client = new MongoClient(MONGO_URL);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
    } catch (err) {
        console.error(err);
    }
}

connectDB();

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create User
app.post("/addUser", async (req, res) => {
    try {
        const userObj = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };

        const db = client.db("Charandeep-db");

        await db.collection("users").insertOne(userObj);

        console.log("User inserted");

        res.send(`
            <h2>User Created Successfully</h2>
            <a href="/">Go Back</a>
        `);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting user");
    }
});

// Get Users
app.get("/getUsers", async (req, res) => {
    try {
        const db = client.db("Charandeep-db");
        const users = await db.collection("users").find({}).toArray();

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});