console.log("document ready pre jquery")
$(document).ready(function () {
    console.log("document ready jquery working")
    $(".accordion").click(function (event) {

        $(this).parent().children(".panel").slideToggle();
        console.log("This is clicked");

    });

    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();


    function onLoad() {
        gapi.load('auth2', function () {
            gapi.auth2.init();
            if (auth2.isSignedIn.get()) {
                var profile = auth2.currentUser.get().getBasicProfile();
                console.log('ID: ' + profile.getId());
                console.log('Full Name: ' + profile.getName());
                console.log('Given Name: ' + profile.getGivenName());
                console.log('Family Name: ' + profile.getFamilyName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
            } else {
                console.log('auth didnt work')
            }
        });
    }




});