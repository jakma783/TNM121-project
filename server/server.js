// MODULES
const http = require("node:http");
const { MongoClient } = require("mongodb");

// Connect the route repository for API-enpoints
const routes = require("./routes/routes");

// Server configuration
const hostName = "127.0.0.1";
const port = 3000;
const serverURL = "http://" + hostName + ":" + port;

// DataBase configuration 
const dbURI = "mongodb://" + hostName + ":" + 27017;
const dbName = "tnm121-project";
const client = new MongoClient(dbURI);

let db;
// Connect to database
async function connectToDataBase() {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
}


// Create sever
const server = http.createServer(async (req, res) => {
    try {
        await routes.handleRequest(req, res, db);
    } catch (err) {
        console.error(err);
        res.statusCode(500);
        res.end("Internal Server Error");
    }
});

// function for sending response
function sendResponse(res, statusCode, contentType, data){
    res.statusCode = statusCode;
    if(contentType){
        res.setHeader("Content-Type", contentType);
    }

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if(data){
        res.end(data);
    } else {
        res.end();
    }
}


// Start server

async function startServer() {
    try {
        await connectToDataBase();

        server.listen(port, hostName, () => {
        console.log("Server listening at " + serverURL);
        });
    } catch (err){
        sendResponse(res, 500, "text/plain", "Internal Server Error");
    }
}

startServer();