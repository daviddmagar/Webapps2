var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyBthC9BLzwfHrmp1xiFk1rglVDqYQ5rB-s",
    authDomain: "cs-3033-fa18.firebaseapp.com",
    databaseURL: "https://cs-3033-fa18.firebaseio.com",
    projectId: "cs-3033-fa18",
    storageBucket: "cs-3033-fa18.appspot.com",
    messagingSenderId: "494659703474"
};

firebase.initializeApp(config);

//Arrays for books and purchases
var products = [];
var purchases = [];

//second array to compare for duplicates against when reloading
var products2 = [];
var purchases2 = []

//Array for filters
var filterVals = []
var totalPrice = 0;


//initial load
// save the firebase database to a variable named database
var database = firebase.database();
// use database to access "departments/books"
database.ref("departments/books").once("value").then(function (snapshot) {
    // save the snapshot value to a local variable named data
    var data = snapshot.val();
    // get all product names by using Object.keys, and iterate over with forEach
    Object.keys(data["products"]).forEach(function (key) {
        // save book to a local variable named book
        var book = data["products"][key];
        products.push(book);
    });
});

//push products to view
exports.load = function () {
    //filterProducts(products);
    return new Promise(function (resolve, reject) {
        resolve(products);
    });
};

exports.loadCheckout = function () {

    
    length = purchases.length - 1;
    //if the last element is defined
    if (purchases[length] != undefined ){
        //if the last element is already the total price then remove it before adding again 
        if (purchases[length].price == totalPrice && purchases.length != 1) {
            purchases.pop();
        }
    }
    book = { price:  totalPrice };
    if (totalPrice == 0){
        book = { 
            name: 'No Items In Cart',
            price:  0 };        
    }
    purchases.push(book);
    purchases2 = purchases;
    purchases = [];
    totalPrice = 0;
    return new Promise(function (resolve, reject) {
        resolve(purchases2);
    });
};


//reload data for each filter change
function reloadData() {
    products = [];

    database.ref("departments/books").once("value").then(function (snapshot) {
        // save the snapshot value to a local variable named data
        data = snapshot.val();
        // get all product names by using Object.keys, and iterate over with forEach
        Object.keys(data["products"]).forEach(function (key) {
            // save book to a local variable named book
            book = data["products"][key];
            products.push(book);            
        });
    });
};

//call each function used to filter the products
exports.filterProducts = function(two, one, available, unavailable, fifty, twentyfive, zero) {
    filterVals = [two, one, available, unavailable, fifty, twentyfive, zero];
    checkPrice(products);
    checkAvailable(products);
    checkRating(products);
    removeUndefined();
    //copy to other array before passing
    products2 = products;
    //refresh data for next filter action
    reloadData();
    return new Promise(function (resolve, reject) {
        resolve(products2);
    });
};


//Check the book rating
function checkRating(products) {
    //TODO: check availbility checkboxes
    products.forEach(function (product) {
        id = product["id"];
        //TODO: check rating checkboxes
        if (filterVals[0] == "true" && filterVals[1] == "true") {
            if (product["rating"] < 2) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }

        } else if (filterVals[0] == "true") {
            if (product["rating"] < 2) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }

        } else if (filterVals[1] == "true") {
            if (product["rating"] < 1) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }
        }
    })
}


//check book availibility
function checkAvailable(products) {
    //TODO: check availbility checkboxes
    products.forEach(function (product) {
        if (filterVals[2] == "true" && filterVals[3] == "false") {
            if (filterVals[3] == "true") {
                //$("#" + id).show();
                console.log("Do nothing");
            } else if (product["stock"] <= 0) {
                removeItem(product);
            }
        } else if (filterVals[3] == "true") {
            if (filterVals[2] == "true") {
                console.log("Do nothing 2");
            } else if (product["stock"] > 0) {
                removeItem(product);
            }
        }
    })

}

//helper function to remove an item from an array
function removeItem(product){
    //console.log(product);
    index = products.indexOf(product);
    delete products[index];
};

//helper function to remove undefined elements from products array
function removeUndefined() {
    products = products.filter(function( element ) {
        return element !== undefined;
    });
};


//check price filtering
function checkPrice(products) {
    //TODO: check availbility checkboxes
    products.forEach(function (product) {

        //console.log(product["price"]); 
        //TODO: check if the product has a product["rating"] of <2

        //TODO: check price checkboxes
        if (filterVals[4] == "true" && filterVals[5] == "true" && filterVals[6] == "true") {
            if (product["price"] < 0 || product["price"] > 100) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }

        } else if (filterVals[4] == "true" && filterVals[5] == "true") {
            if (product["price"] < 25) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }

        } else if (filterVals[4] == "true" && filterVals[6] == "true") {
            if (product["price"] >= 25 && product["price"] < 50) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }

        } else if (filterVals[5] == "true" && filterVals[6] == "true") {
            if (product["price"] > 50) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }

        } else if (filterVals[4] == "true") {
            if (product["price"] < 50) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }
            // end if
        } else if (filterVals[5] == "true") {
            if (product["price"] < 25 || product["price"] > 50) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()                
                removeItem(product);
            }
            // end if
        } else if (filterVals[6] == "true") {
            if (product["price"] > 25) {
                // TODO: use JQuery to select the product element with id=product["id"].
                // don't forget to prepend "#" to use the id selector
                // TODO: hide the product element with .hide()               
                removeItem(product);
            }
            // end if
        }

    })
};

//Helper to look up book object by id
function getByValue(arr, value) {
    for (var i=0, iLen=arr.length; i<iLen; i++) {  
        if (arr[i].id == value) return arr[i];
    };
};


exports.purchaseProducts = function(id) {
    id = getByValue(products, id);    
    purchases.push(id);
    console.log(totalPrice)
    totalPrice = totalPrice + id.price;
    console.log(totalPrice)
};

exports.checkOut = function() {
    console.log(purchases2);
    purchases2.pop();
    console.log(purchases2);
    //console.log(database.ref("departments/books/products/"+ product.id));
    purchases2.forEach(function (product) {
        database.ref("departments/books/products/"+ product.id).update({ "stock": product.stock-1});
    });
    reloadData();
    return new Promise(function (resolve, reject) {
        resolve(products);
    });
};

