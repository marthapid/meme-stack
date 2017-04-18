var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var MEMES_COLLECTION = "memes";

var app = express();
app.use(bodyParser.json());


// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var dbUrl;
if (process.env.MONGODB_URI) {
  dbUrl = process.env.MONGODB_URI;
} else {
  dbUrl = "mongodb://localhost/meme-stack";
}

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(dbUrl, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// MEMES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/memes"
 *    GET: finds all memes
 *    POST: creates a new meme
 */

app.get("/api/memes", function(req, res) {
  db.collection(MEMES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get memes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/memes", function(req, res) {
  var newMeme = req.body;
  newMeme.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(MEMES_COLLECTION).insertOne(newMeme, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new meme.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/memes/:id"
 *    GET: find meme by id
 *    PUT: update meme by id
 *    DELETE: deletes meme by id
 */

app.get("/api/memes/:id", function(req, res) {
  db.collection(MEMES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get meme");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/memes/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MEMES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update meme");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/memes/:id", function(req, res) {
  db.collection(MEMES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete meme");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
