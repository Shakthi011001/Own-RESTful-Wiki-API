//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/WikiDB", {
  useNewUrlParser: true
}, {
  useUnifiedTopology: true
});
const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

.get(function(req, res){
  Article.find(function(err, foundArticles){
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send("No articles currently in wikiDB.");
    }
  });
})

.post(function(req, res){
  const newArticle = Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){

  Article.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all the articles in wikiDB.");
    } else {
      res.send(err);
    }
  });

});
//Below for a spcific article
app.route("/articles/:articleTitle")


.get(function(req, res){
  const articleTitle = req.params.articleTitle;
  Article.findOne({title: articleTitle},function(err, foundArticles){
    if (foundArticles) {
      res.send(foundArticles);
    } else {
      res.send("No articles currently in wikiDB.");
    }
  });
})

.put(function(req,res){
  Article.update({title: req.params.articleTitle}, {title: req.body.title, content:req.body.content},{overwrite: true}, function(err){
    if(!err){
      res.send("Successfully Updated the Article");
    }
    else{
      console.log(err);
    }
  })
})

.patch(function(req, res){
  const articleTitle = req.params.articleTitle;
  Article.update(
    {title: articleTitle},
    {$set: req.body},
    function(err){
      if (!err){
        res.send("Successfully updated selected article.");
      } else {
        res.send(err);
      }
    });
})

.delete(function(req, res){
  const articleTitle = req.params.articleTitle;
  Article.deleteOne({title: articleTitle}, function(err){
    if (!err){
      res.send("Successfully deleted selected article.");
    } else {
      res.send(err);
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
