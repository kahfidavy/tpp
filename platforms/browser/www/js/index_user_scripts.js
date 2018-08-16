/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  Button */
    $(document).on("click", ".uib_w_7", function(evt)
    {
        /* your code goes here */ 
        
        //alert('Anda pindah ke halaman input');
        window.location='input.html';
        
    });
    
        /* button  Laporan */
    $(document).on("click", ".uib_w_8", function(evt)
    {
        window.open('http://inicumatest.pe.hu/Laporan.php', '_system' ,'location=yes');
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
