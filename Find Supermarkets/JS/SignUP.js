"use strict"
function newUser(){

    if(Username.value == ""){
      alert("please fill username");
      return;
    } 
    
    if(Displayname.value == ""){
      alert("please fill display name");
      return;
    }
    if(password.value == ""){
      alert("please fill password ");
      return;
    }
    if(password.value!=confirmPassword.value){
        alert("password not matches!");
        return;
    }   
       
    const user={
        user : Username.value,
        display : Displayname.value,
        pass : password.value,
        status : "true"
    }
    $.ajax({
        url: 'https://gis-proj-10b31.firebaseio.com/users.json',
        type: "POST",
        data: JSON.stringify(user),
        success: function () {
          alert("success");
        },
        error: function(error) {
          alert("error: "+error);
        }
      });
   window.localStorage.setItem(user.user,JSON.stringify(user)); 
   form.action="index.html";
}