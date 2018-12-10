jQuery(document).ready(function () {

    //Render
    function main() {


        //Click handler for checkout
        $(document).on("click", "#checkoutBtn", function () {
            console.log("checking out")
            $.post("/checkOut", function (view) {});           
        });
    };


    main();

})();