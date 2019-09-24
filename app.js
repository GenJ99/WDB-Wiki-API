// Packet initialization within file upon creation of express app object.
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

// Ejs view engine, bodyparsing, and public static initialization is done.
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



//**Database Info Using Mongo/Mongoose**//
// Creation of mongoDB Connection
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create Mongoose articles schema
const articleSchema = ({
  title: String,
  content: String
});

// Creation of a Mongoose model
const Article = mongoose.model("Article", articleSchema);



app.get("/articles", function(req, res) {
  // Find all the records within the Article document.
  // Note: empty condition with only a callback function to
  // show the entire collection of Article model.
  Article.find(function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});



// Port listening
app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
