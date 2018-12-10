// the Express node backend web server - installed via npm
var express = require("express");
// bodyParser is used to parse HTML request bodies - installed via npm
var bodyParser = require("body-parser");
// a file directory parser provided by node - no need to install
var fs = require("fs");
// a template parser - installed via npm
var Mustache = require("mustache");

// the local module for the model
var model = require("./model/model.js");

// initialize the Express web app
var app = express();
// get the port from command line
// 0 arg is always node, 1 arg is always filename
// 2 arg is the first command line arg
var port = parseInt(process.argv[2]);

// configure app to use bodyParser with a basic URL decoder
app.use(bodyParser.urlencoded({
    extended: false
}));
// configure app to be able to decode JSON
app.use(bodyParser.json());

// a GET route for the root entry point
app.get("/", function (req, res) {
    // __dirname is set to the current working directory
    res.sendFile(__dirname + "/index.html");
});

// an alternate root entry point
app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// an alternate app entry point
app.get("/app.js", function (req, res) {
    res.sendFile(__dirname + "/app/app.js");
});

app.get("/style.css", function (req, res) {
    res.sendFile(__dirname + "/lib/css/style.css");
});

// an alternate cart entry point
app.get("/cart.js", function (req, res) {
    res.sendFile(__dirname + "/app/cart.js");
});

// a GET route for the mustache.js client side library
app.get("/mustache.js", function (req, res) {
    res.sendFile(__dirname + "/mustache.min.js");
});


// a RESTful GET route to load the initial view
// should return the rendered view template
app.get("/load", function (req, res) {
    model.load().then(function (products) {
        var view = fs.readFileSync("./view.mjs", "utf8");
        res.send(Mustache.render(view, {
            products: products
        }));
    });
});


// a RESTful POST route to filter the products
// should return the JSON representation of the filtered products
app.post("/filterProducts", function (req, res) {
    model.filterProducts(req.body.two, req.body.one, req.body.available, req.body.unavailable, req.body.fifty, req.body.twentyfive, req.body.zero).then(function (products) {
        var view = fs.readFileSync("./view.mjs", "utf8");
        res.send(Mustache.render(view, {
            products: products
        }));
    });
});

//Send product id to model to store in an array
app.post("/purchaseProducts", function (req, res) {
    console.log("---------Purchase--------------")
    model.purchaseProducts(req.body.id);
});

//Display cart page
app.get("/cart", function (req, res) {
    model.loadCheckout().then(function (purchases) {
        console.log(purchases)
        var view = fs.readFileSync("./cart/view.mjs", "utf8");
        res.send(Mustache.render(view, {
            purchases: purchases
        }));
    });
});

//Send product id to model to store in an array
app.post("/checkOut", function (req, res) {
    console.log("---------Checkout--------------")
    model.checkOut().then(function (products) {
        var view = fs.readFileSync("./view.mjs", "utf8");
        res.send(Mustache.render(view, {
            products: products
        }));
    });;
});

// start the web server attached to the provided port
app.listen(port, function () {
    console.log("listening on localhost: " + port);
});
