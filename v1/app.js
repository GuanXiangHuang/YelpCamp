var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

//requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

//seedDB();

//mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://Guan:Guanxiang1234@cluster0-esmdy.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useCreateIndex: true});

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again, Bella wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");

	next();
});


//SCHEMA SETUP


// Campground.create({
// name:"Granite Hill", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg", description: "This is a huge granite hill, no bathrooms, no water, beautiful granite!"
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		console.log("NEWLY CREATED CAMPGROUND: ");
// 		console.log(campground);
// 	}
// });

var campgrounds=[
		{name:"Salmon Creek", image:"https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg"},
		{name:"Granite Hill", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
		{name:"Mountain Goat's Rest", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
		{name:"Salmon Creek", image:"https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg"},
		{name:"Granite Hill", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
		{name:"Mountain Goat's Rest", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
		{name:"Salmon Creek", image:"https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg"},
		{name:"Granite Hill", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
		{name:"Mountain Goat's Rest", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"}
	];

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("The YelpCamp Server has Started!");
});