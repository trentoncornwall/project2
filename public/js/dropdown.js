console.log("document ready pre jquery")
$(document).ready(function(){
    console.log("document ready jquery working")
    
    $(".accordion").click(function(event){

        $(this).parent().children(".panel").slideToggle();
        console.log("This is clicked");
        
    });

    $('.collapsible').collapsible();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
    $('select').formSelect();




});



  