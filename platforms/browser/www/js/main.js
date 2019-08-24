/*jslint sloppy:true, browser:true, devel:true, white:true, vars:true, eqeq:true, plusplus:true */
/*global $:false, intel:false*/
/** 
 * This function runs once the page is loaded, but intel is not yet active 
 */

var windowHeight;
var init = function () {
    windowHeight=window.innerHeight;
    var currentpic = document.getElementById("slideshowpicid");  
    currentpic.onload=alignImageMiddle;
};

window.addEventListener("load", init, false);  

/**
 * Prevent Default Scrolling 
 */
//var preventDefaultScroll = function(event) 
//{
//    // Prevent scrolling on this element
//    event.preventDefault();
//    window.scroll(0,0);
//    return false;
//};
//    
//window.document.addEventListener("touchmove", preventDefaultScroll, false);

/**
 * Device Ready Code 
*/

var onDeviceReady=function(){                             // called when Cordova is ready
   if( window.Cordova && navigator.splashscreen ) {     // Cordova API detected
        navigator.splashscreen.hide() ;                 // hide splash screen
    }
} ;
document.addEventListener("deviceready", onDeviceReady, false);


//Event listener for camera
//document.addEventListener("intel.xdk.camera.picture.add",onSuccess); 
//document.addEventListener("intel.xdk.camera.picture.busy",onSuccess); 
//document.addEventListener("intel.xdk.camera.picture.cancel",onSuccess); 
var picturecount=0;

function onSuccess(imageURI) 
{
       
    var pic1 = document.getElementById("fotoktp");


        var changebutton = document.getElementById("buttonid");    


        pic1.src = imageURI;
    

        if(picturecount>=0){
			uploadPhoto();
            changebutton.innerHTML = "Ganti Photo";
            changebutton.onclick=uploadPhoto;
             
        }
        
           
}

function onFail(message) {
   console.log("Picture failure: " + message);
}
//This function creates the slideshow of the captured pictures.
function makeslideshow()
{
    var changebutton = document.getElementById("buttonid");
    var pic1 = document.getElementById("fotoktp");
    var pic2 = document.getElementById("phototwo");
    var pic3 = document.getElementById("photothree");
    pic1.className="hide";
    pic2.className="hide";
    pic3.className="hide"; 
    changebutton.innerHTML="Take Picture";   
    changebutton.className="button hide";
    document.getElementById("imagecontent").className="show";
    var currentpic = document.getElementById("slideshowpicid");
    currentpic.src=pic1.src;
}

function alignImageMiddle(){
    var currentpic = document.getElementById("slideshowpicid");  
    var height = window.innerHeight;
    currentpic.style.marginTop=(height-currentpic.offsetHeight)/2+"px";
}

/**
 * The following functions could be a single function that moves forwards or backwards.
 * For the demo we want users to be able to see exactly what is going on
 */

//Move to the next picture.  If we are at the last picture, we jump to the first.
function Next()
{
    var pic1 = document.getElementById("fotoktp");
    var pic2 = document.getElementById("phototwo");
    var pic3 = document.getElementById("photothree");
    var currentpic = document.getElementById("slideshowpicid");
    var currentsrc = currentpic.src;

    if(currentsrc===pic1.src)
    {
        document.getElementById("slideshowpicid").src=pic2.src;  
        alert(pic1);
    }
    else if(currentsrc===pic2.src)
    {
        document.getElementById("slideshowpicid").src=pic3.src;
    }
    else
    {
        document.getElementById("slideshowpicid").src=pic1.src;
    }
    
}

//Move to previous picture.  If we are at the first picutre, we jump to the last.
function Previous()
{
    var pic1 = document.getElementById("fotoktp");
    var pic2 = document.getElementById("phototwo");
    var pic3 = document.getElementById("photothree");

    var currentsrc = document.getElementById("slideshowpicid").src;

     if(currentsrc===pic1.src)
    {
       document.getElementById("slideshowpicid").src=pic3.src; 
    }
    else if(currentsrc===pic2.src)
    {
        document.getElementById("slideshowpicid").src=pic1.src;
    }
    else
    {
       document.getElementById("slideshowpicid").src=pic2.src;
    }

}

//Functionality to end the slideshow
function endslideshow()
{
    document.getElementById("imagecontent").className="hide";
    picturecount=0;

    var pic1 = document.getElementById("fotoktp");
    var pic2 = document.getElementById("phototwo");
    var pic3 = document.getElementById("photothree");
    var changebutton = document.getElementById("buttonid");
    
    pic1.className="";
    pic2.className="";
    pic3.className="";  

    pic1.src="images/EmptyBox-Phone.png";
    pic2.src="images/EmptyBox-Phone.png";
    pic3.src="images/EmptyBox-Phone.png";
    
    changebutton.onclick=takepicture;  
    changebutton.className="button";
}

//Camera button functionality
function takepicture()
{
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true });

}

 function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 alert('get picture failed');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}

function uploadPhoto() {
var changebutton = document.getElementById("buttonid");
var pic1 = document.getElementById("fotoktp");
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = pic1.src.substr(pic1.src.lastIndexOf('/') + 1);
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

var ft = new FileTransfer();
 ft.upload(pic1.src, "http://192.168.1.3/api_daftar/upload.php", function(result){
 console.log(JSON.stringify(result));
 }, function(error){
 console.log(JSON.stringify(error));
 }, options);
     var changebutton = document.getElementById("buttonid");    
            var gambar = document.getElementById("gambar");  
            gambar.value = pic1.src.substr(pic1.src.lastIndexOf('/') + 1);
            changebutton.innerHTML = "Take Picture";
            changebutton.onclick=takepicture;
            picturecount++; 

 }
 
 function delete_image()
{
  var status = confirm("Are you sure you want to delete ?");  
  if(status==true)
  {
    var file = $("#delete_file").val();
    $.ajax({
      type:"POST",
      url:"ImageLap.php",
      data:{file:file},
      success(html){
       alert('Deleted');
      }
    });
  }
 }

