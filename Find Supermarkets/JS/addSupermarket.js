$("document").ready(function() {
    let account = whoConnected();
    let add = document.getElementById("add");
    let notconnect = document.getElementById("not_connected");
    if(account == null) {
        add.style.display = "none";
        notconnect.style.display = "block";
        return;
    }
    add.style.display = "flex";
    notconnect.style.display = "none";
});

function Add() {
    let error = checkForm();
    if(error != ""){
      alert(error);
      return;
    }
    const  supermarket = {
        name : superName.value,
        address : address.value,
        coordinatesX : coordinateX.value,
        coordinatesY : coordinateY.value,
        sunday : Sunday.value,
        monday : Monday.value,
        tuesday : Tuesday.value,
        wednesday : Wednesday.value,
        tursday : Tursdsday.value,
        friday : Friday.value,
        saturday : Saturday.value,
        rate : rate.value
    }
    $.ajax({
        url: 'https://gis-proj-10b31.firebaseio.com/supermarket.json',
        type: "POST",
        data: JSON.stringify(supermarket),
        success: function () {
          alert("success");
        },
        error: function(error) {
          alert("error: "+error);
        }
      });
   form.action="index.html";
}

function checkForm() {
  let str= {};
  if(superName.value == "")
    str="please fill name";  
  else if(address.value == "")
    str="please fill address";
  else if(coordinateX.value == "")
    str="please fill coordinateX";
  else if(coordinateY.value == "")
    str="please fill coordinateY";
  else if(Sunday.value == "")
    str="please fill Sunday";
  else if(Monday.value == "")
    str="please fill Monday";    
  else if(Tuesday.value == "")
    str="please fill Tuesday";
    else if(Wednesday.value == "")
    str="please fill Wednesday";
  else if(Tursdsday.value == "")
    str="please fill Tursdsday";
  else if(Friday.value == "")
    str="please fill Friday";    
  else if(Saturday.value == "")
    str="please fill Saturday";
  else if(rate.value == "")
    str="please fill rate";
  else str = "";
  return str;      
}