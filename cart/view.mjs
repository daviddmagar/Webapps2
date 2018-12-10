<!-- Required doctype -->
<!doctype html>
<!-- Required html element, optional set lang="en" -->
<html lang="en">
<!-- Required head element -->

<head>
    <!-- Required meta tags, both charset and viewport -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS, comes from the Bootstrap starter tempalte -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/style.css">
    <!-- JQuery first, then Popper.js, then Bootstrap JS, comes from the Bootstrap starter template -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script></link>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>


    <!-- App JS entry point provided via Express -->
    <!--<script src="/app/app.js"></script> -->





    <!-- Title of the project -->
    <title>Zmazon Online Checkout</title>

<!--Shamelessly ripped from the bootstrap site cause I couldn't get expand to work with my project 1 nav bar for some reason.-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Zmazon</a>

        <div class="navbar bg-light navbar-light navbar-expand-lg">
            <!-- The "navbar-nav" provides CSS properties for the nav elements -->
            <!-- TODO: Create an a element for the Departments tab. Must have class="nav-link". Set href="#" -->
            <a class="nav-link" href="#">Departments</a>
            <!-- Alternatively, we could just use one a element with class="navbar-nav nav-link" -->
            <!-- Close the div element -->
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>



        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item "> 
                    <a class="nav-link" href="#">Localization</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Account</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/cart" id="Cart">Cart</a>
                </li>
            </ul>

        </div>
    </nav>

    <!-- Close head element -->
</head>

<!-- Required body element -->

<body>
    <div class="container-fluid text-center">
    <h3 align="center">Your Cart:</h3>
        <div class="row">        
                <div id="cart" class="container">
                    {{#purchases}}                        
                    <div id={{id}} style="">
                    <p><b>{{name}}</b><br>Price: ${{price}}</p>
                    </div>
                    {{/purchases}}
                    <a class="btn btn-primary" href="/" id="checkoutBtn">Checkout</a>     
                </div>           
            </div>
        </div>
    </div>
</body>

<footer class="page-footer font-small blue pt-4">

<div class="container-fluid text-center">

    <!-- Grid row -->
    <div class="row">
        <div class="col center-block">
            <h4 class="text-uppercase">Resources</h4>
        </div>
    </div>

    <div class="row">


        <!-- Grid column -->
        <div class="col-md-6 mt-md-0 mt-3">

            <!-- Content -->
            <a class="text-uppercase" href="#">About Us</a>
        </div>
        <div class="col-md-6 mt-md-0 mt-3">

            <!-- Content -->
            <a class="text-uppercase" href="#">Contact Us</a>
        </div>
</footer>

<script src="https://www.gstatic.com/firebasejs/5.5.4/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.5.4/firebase-database.js"></script>
<!-- Custom JS comes last, should only be single entry point -->
<script src="/app.js"></script>
<script src="/cart.js"></script>
<!-- Mustache provided via Express -->
<script src="/mustache.js"></script>

<script id="template" type="x-tmpl-mustache">
                    {{#purchases}}    
                    <div class="col" id={{id}} style="">
                    <p><b>{{name}}</b><br>Price: ${{price}}</p>
                    </div>
                    {{/purchases}}
</script>

<!-- Close html element -->

</html>
<!-- End Document -->
