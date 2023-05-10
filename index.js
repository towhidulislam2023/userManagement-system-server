const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// usermanagementsystemforpractice
// RHrSBIkuEnZw5574


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://usermanagementsystemforpractice:RHrSBIkuEnZw5574@cluster0.w8zzyxt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const userDataCollection = client.db("userdataCollectiondb").collection("userdbForpractice")

        // get 
        app.get("/users", async (req, res) => {
            const cursor = userDataCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get("/users/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await userDataCollection.findOne(query)
            res.send(result)
        })

        // post 
        app.post("/addUser", async (req, res) => {
            const users = req.body
            const result = await userDataCollection.insertOne(users)
            res.send(result)
        })
        // put 
        app.put("/updateUser/:id", async (req, res) => {
            const id = req.params.id
            const users = req.body
            console.log(users);
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateUser = {
                $set:{
                    name: users.name,
                    email: users.email,
                    gender: users.gender,
                    active: users.active
                }
            }
            const result = await userDataCollection.updateOne(filter, updateUser, options)
            res.send(result)
        })
        app.delete("/delletusers/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await userDataCollection.deleteOne(query)
            res.send(result)
        })










        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})