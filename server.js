var app = require("express")();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var http = require("http");
var morgan = require("morgan");
var server;

app.use(bodyParser.urlencoded({extended:true}));


app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan("dev"));

app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


data = [
	{"_id": 1, "name": "Jane Doe"},
	{"_id": 2, "name": "Jack Sparrow"},
	{"_id": 3, "name": "Joane Doe"},
	{"_id": 4, "name": "Jane Doe"},
	{"_id": 5, "name": "Jhon Doe"}
];

app.get("/", function(req, res){
	res.send("<h1> Welcome to express api-test </h1>");
});

app.get("/users", function(req, res){
	res.status(200).json(data);
});


app.post("/users", function(req, res){
	if(err){
		res.status(500).json(err);
	}

	data.push(req.body);
	res.json(data);
});


app.get("/user/:id", function(req,res){
	var id = req.params.id;

	var dataItem = data.filter(function(item){
		return item._id == id; // return true or false
	})[0];

	if(dataItem){
		res.json(dataItem);
	}
	else{
		res.status(404).send("data not found!");
	}

});

app.delete("/user/:id", function(req, res){
	var id = req.params.id;
	var dataItem = data.filter(function(item){
		return item._id == id;
	})[0];
	if(dataItem){
    delete dataItem.id;
	  delete dataItem.name;
	 res.status(200).json();
	}else{
		res.status(404).json("Not found!");
	}
});


app.put("/user/:id", function(req, res){
	var id = req.params.id;
	var dataItem = data.filter(function(item){
		//return true if this is found
		return item._id == id;
	});

	if(dataItem){
		dataItem.name = req.body.name;
		res.status(200).json();
	}
	else{
		throw err;
		res.status(500).json(err);
	}
});



var server = http.createServer(app);

server.listen(3000, function(){
	console.log("I'm in on address http://localhost:3000");
});
