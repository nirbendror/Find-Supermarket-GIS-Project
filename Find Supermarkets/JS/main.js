"use strict"
function whoConnected(){
    
    if(localStorage.length>1)
    {
        let account  = JSON.parse(window.localStorage.getItem(localStorage.key(1)));
        return account;
    }  
    return null;
}
