console.log("document ready pre jquery")
$(document).ready(function(){
    console.log("document ready jquery working")
    $(".accordion").click(function(event){

        $(this).parent().children(".panel").slideToggle();
        console.log("This is clicked");
        
    });
});

 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.collapsible').collapsible();
  });

   document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.datepicker').datepicker();
  });