$(document).ready(function () {
    // Get references to the dropdown trigger and menu
    var dropdownTrigger = $(".dropdown-trigger");
    var dropdownMenu = $(".dropdown-menu");

    // Toggle the dropdown menu when the trigger button is clicked
    dropdownTrigger.click(function () {
        dropdownMenu.toggleClass("is-active");
    });

    // Close the dropdown when clicking outside of it
    $(document).on("click", function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            dropdownMenu.removeClass("is-active");
        }
    });
});