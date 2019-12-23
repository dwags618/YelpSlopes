var express=require("express")
var router=express.Router()
var Campground=require("../models/campground")

//index
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	})
	
});

//create
router.post("/", isLoggedIn, function(req, res){

	//get data from form and add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name, image: image, description:desc, author:author}
	//Create new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirec back to campgrounds page
			console.log(newlyCreated)
			res.redirect("/campgrounds");
		}
	})
	
})

//new
router.get("/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new");
})

//show
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
})

//edit campground route
router.get("/:id/edit", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			res.redirect("/campgrounds")
		} else{
			res.render("campgrounds/edit", {campground: foundCampground})
		}
	})
	
})
//update campground route
router.put("/:id", function(req, res){
	//find and update the correct campground and redirect somewhere (show page)

	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds")
		} else{
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/login")
}

module.exports=router