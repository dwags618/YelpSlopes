var express = require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

var campgroundSchema = new mongoose.Schema({
	name: String, 
	image: String,
	description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Salmon Creek", 
// 		image:"https://www.campsitephotos.com/photo/camp/33040/feature_Coral_Pink_Sand_Dunes-f4.jpg",
// 		description: "This is a huge granite hill, no bathrooms, no water. Beautiful granite"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err)
// 		} else{
// 			console.log("NEWLY CREATE CAMPGROUND")
// 			console.log(campground)
// 		}
// 	});

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
		
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("index", {campgrounds:allCampgrounds});
		}
	})
	
});

app.post("/campgrounds", function(req, res){

	//get data from form and add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground = {name:name, image: image, description:desc}
	//Create new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirec back to campgrounds page
			res.redirect("/campgrounds");
		}
	})
	
})

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
})

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("show", {campground: foundCampground});
		}
	});
})

app.listen(3000, function() {
	console.log('Server listening on port 3000');
});