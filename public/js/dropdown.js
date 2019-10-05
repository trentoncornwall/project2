console.log("document ready pre jquery")
$(document).ready(function () {
    console.log("document ready jquery working")
    $(".accordion").click(function (event) {

        $(this).parent().children(".panel").slideToggle();
        console.log("This is clicked");

    });

    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();


    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
});