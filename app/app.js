jQuery(document).ready(function () {

    //Render
    function main() {

        $.get("/load", function (view) {

            $("#view").html(view);

        })


        //Click handler for filter
        $(".form-check").change(function () {
            $.post("/filterProducts", {
                two: $("#two").is(":checked"),
                one: $("#one").is(":checked"),
                available: $("#availableBox").is(":checked"),
                unavailable: $("#unavailableBox").is(":checked"),
                fifty: $("#fiftyDollars").is(":checked"),
                twentyfive: $("#twentyfiveDollars").is(":checked"),
                zero: $("#zeroDollars").is(":checked")
            }, function (view) {
                $("#view").html(view);
            });
        });

        //Push purchased ids to model
        
        $(document).on("click", "button", function () {
            //var filterArray = {};
            id = $(this).attr("id");
            $.post("/purchaseProducts", {
                id: id
            }, function (view) {});
        });

        //Show checkout page
        $(document).on("click", "#Cart", function () {
            $.post("/shoppingCart", function (view) {});
        });

    };


    main();

})();