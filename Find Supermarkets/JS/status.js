"use strict"
$("document").ready(function(){
       
    if(localStorage.length>1)
    {

        let elem=$("<a></a>").html("Logout").click(function(){
            logout()
        });
        $("#log").append(elem); 

    }
    else{

        let elem=$("<a></a>").html("Login").click(function(){window.location.href='Login.html';});
        $("#log").append(elem);  
    }
});     
function logout()
{ 
    window.localStorage.removeItem(localStorage.key(1));                                
    window.location.href='Login.html';
}
 
