'use strict';

var express = require("express"),
		index = express(),
		bodyParser = require("body-parser"),
		$ = require("jquery"),
		mongoose = require("mongoose"),
		methodOverride = require("method-override");


mongoose.connect("mongodb://localhost/blog");
index.set("view engine", "ejs");
index.use(express.static(__dirname + '/public'));
index.use(bodyParser.urlencoded({extended: true}));
index.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
	title: String,
	subtitle: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

index.get("/", function(req, res){
	res.render("index");
});

index.get("/color-game", function(req, res){
	res.render("color-game");
});

index.get("/blog", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render("./blog/index", {blogs: blogs});
		}
	});	
});

index.get("/blog/new", function(req, res){
	res.render("./blog/new");
});

index.post("/blog", function(req, res){
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("./blog/new");
		} else {
			res.redirect("/blog");
		}
	});
});

index.get("/blog/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log(err);
		} else {
			res.render("./blog/show", {blog: foundBlog});
		}
	});
});

index.get("/blog/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if (err){
			res.redirect("/blog");
		} else {
			res.render("./blog/edit", {blog: foundBlog});
		}
	});
});

index.put("/blog/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if (err){
			res.redirect("/blog");
			console.log(err)
		} else {
			res.redirect("/blog/" + req.params.id);
		}
	});
});





index.listen(process.env.PORT || 3000, function () {
  console.log("Listening on http://localhost:" + (process.env.PORT || 3000));
});

