"use strict"
let users = [{
    user: String,
    password:String,
    display:String,
    status:Boolean
}];
var ref = firebase.database().ref().child("users");
ref.on('child_added', snap => {
    users.push({user:snap.child("user").val(),password:snap.child("pass").val(),display:snap.child("display").val(),status:false}); 
});
function checkuser()
{ 
    const loginUser = {
        user: username.value,
        password: password.value,
        };   
    var user = users.find(user => {
        return user.user== loginUser.user && user.password == loginUser.password
    });    
    if(user == undefined) {
        alert('username or password is incorrect!');
    }
    else {
        window.localStorage.setItem(loginUser.user,JSON.stringify(user));
        form.action="index.html"; 
    }               
}

