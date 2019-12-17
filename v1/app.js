var express = require("express");
var app = express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

var campgrounds=[
			{name: "Salmon Creek", image:"https://www.campsitephotos.com/photo/camp/33040/feature_Coral_Pink_Sand_Dunes-f4.jpg"},
			{name: "Granite Hill", image:"https://www.campsitephotos.com/photo/camp/113905/feature_Staunton_River_State_Park-f3.jpg"},
			{name: "Mount Rainier", image:"https://www.campsitephotos.com/photo/camp/32494/feature_Sunset-f4.jpg"},
			{name: "Salmon Creek", image:"https://www.campsitephotos.com/photo/camp/33040/feature_Coral_Pink_Sand_Dunes-f4.jpg"},
			{name: "Granite Hill", image:"https://www.campsitephotos.com/photo/camp/113905/feature_Staunton_River_State_Park-f3.jpg"},
			{name: "Mount Rainier", image:"https://www.campsitephotos.com/photo/camp/32494/feature_Sunset-f4.jpg"},
			{name: "Salmon Creek", image:"https://www.campsitephotos.com/photo/camp/33040/feature_Coral_Pink_Sand_Dunes-f4.jpg"},
			{name: "Granite Hill", image:"https://www.campsitephotos.com/photo/camp/113905/feature_Staunton_River_State_Park-f3.jpg"},
			{name: "Mount Rainier", image:"https://www.campsitephotos.com/photo/camp/32494/feature_Sunset-f4.jpg"},
		]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
		

		res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){

	//get data from form and add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var newCampground = {name:name, image: image}
	campgrounds.push(newCampground);
	//redirec back to campgrounds page
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
})

app.listen(3000, function() {
	console.log('Server listening on port 3000');
});