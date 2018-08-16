/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #BACK */
    $(document).on("click", "#BACK", function(evt)
    {
        /* your code goes here */ 
        
        window.location="index.html";
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
