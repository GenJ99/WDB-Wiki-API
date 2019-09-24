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



//** Requests Targeting all Articles **//
// Route method is used for /articles to reduces repeat code and errors.
app.route("/articles")

  .get(function(req, res) {
    // FIND all the records within the Article document.
    // Note: empty condition with only a callback function to
    // show the entire collection of Article model.
    Article.find(function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {
    // POST a new article that a client sends. A new model is created with the use of the article
    // title and content. The newArticle is then saved as a Success response is sent.
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    // DELETE a collection from wikiDB. With deleteMany() the method will delete everything within the
    // the Article model.
    // NOTE: Wasn't working within the POSTMAN application.

    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });


//** Requests targeting a specific article **//
app.route("/articles/:articleTitle")

.get(function(req, res) {
  // GET one article from the articles collection. The findOne() method is uses as the title key
  //  and request parameter of articleTitle are the pasted conditions.
  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
    if(foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("no articles matching that title was found.");
    }
  });
});



// Port listening
app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
