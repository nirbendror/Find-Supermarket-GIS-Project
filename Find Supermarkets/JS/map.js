"use strict"

let currentLayer = {}; 
let currentmarker = {};
let currentDetail ={};
let features = [];
let flag = 0; 
let autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
let bounds_group = new L.featureGroup([]);  
$("document").ready(function() {

    let account = whoConnected();
    let page = document.getElementById("allPage");
    let notconnect = document.getElementById("not_connected");
    if(account == null) {
        page.style.display = "none";
        notconnect.style.display = "block";
        return;
    }
    page.style.display = "block";
    notconnect.style.display = "none";
    $("#name").append("<h2>Hello "+ account.display + "<br></h2>"); 
        let  gpsButton = document.getElementById('gpsButton');
        let shabat = document.getElementById('openShabat');
        let kosher = document.getElementById('kosher');
        let allSupermarket = document.getElementById('allSupermarket');      
        var map = L.map('mymap', {
            zoomControl:true, maxZoom:28, minZoom:10
        }).fitBounds([[31.99577210346326,34.7392607227196],[32.03734806526681,34.83087452842186]]);               
         
        map.createPane('pane_OSMStandard_0');
        map.getPane('pane_OSMStandard_0').style.zIndex = 400;
        var layer_OSMStandard_0 = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            pane: 'pane_OSMStandard_0',
            opacity: 1.0,
            minZoom: 1,
            maxZoom: 28,
            minNativeZoom: 0,
            maxNativeZoom: 19
        });
        layer_OSMStandard_0;
        map.addLayer(layer_OSMStandard_0);              
      
        gpsButton.addEventListener("click", function(){
            removeMarker(map);
            navigator.geolocation.getCurrentPosition(function(location) {
            let latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);      
            map.setView(latlng, 15);                 
            let marker = L.marker(latlng).addTo(map);
            currentmarker = marker;            
            });
        });                            
        map.createPane('pane_Supermarks_1');
        map.getPane('pane_Supermarks_1').style.zIndex = 401;
        map.getPane('pane_Supermarks_1').style['mix-blend-mode'] = 'normal';        
        shabat.addEventListener("click", function() {
                if (currentLayer != undefined) {
                    map.removeLayer(currentLayer);
                }
                removeMarker(map);
                removedetails();           
                hideAll();
                $("#5").show().css('display', 'flex');
                $("#6").show().css('display', 'flex');
                $("#11").show().css('display', 'flex');
                $("#48").show().css('display', 'flex');
                $("#56").show().css('display', 'flex');
                let layer_Shabat = new L.geoJson(json_Shabat, {
                    attribution: '',
                    interactive: true,
                    dataVar: 'json_Shabat',
                    layerName: 'layer_Shabat',
                    pane: 'pane_Supermarks_1',
                    onEachFeature:  pop_Supermarks_1,
                    pointToLayer: function (feature, latlng) {
                        var context = {
                            feature: feature,
                            variables: {}
                        };
                        return L.circleMarker(latlng, style_Supermarks_1_0(feature));
                    },
                });
                currentLayer = layer_Shabat;
                bounds_group.addLayer(layer_Shabat);
                map.addLayer(layer_Shabat); 
            });
        kosher.addEventListener("click", function() {
                if (currentLayer != undefined) {
                    map.removeLayer(currentLayer);
                }
                removeMarker(map);
                removedetails();
                hideAll();
                $("#7").show().css('display', 'flex');
                $("#8").show().css('display', 'flex');
                $("#10").show().css('display', 'flex');
                $("#13").show().css('display', 'flex');
                $("#27").show().css('display', 'flex');
                let layer_Kosher = new L.geoJson(json_Kosher, {
                    attribution: '',
                    interactive: true,
                    dataVar: 'json_Kosher',
                    layerName: 'layer_Shabat',
                    pane: 'pane_Supermarks_1',
                    onEachFeature:  pop_Supermarks_1,
                    pointToLayer: function (feature, latlng) {
                        var context = {
                            feature: feature,
                            variables: {}
                        };
                        return L.circleMarker(latlng, style_Supermarks_1_0(feature));
                    },
                });
                currentLayer = layer_Kosher;
                bounds_group.addLayer(layer_Kosher);
                map.addLayer(layer_Kosher); 
            });

        allSupermarket.addEventListener("click", function() {
            showAllSupermarket(map);   
        });       
        showAllSupermarket(map);         
               
});

function hideAll() {
    for(let i=1;i<58;i++){
        $("#"+i).hide();
    }
}

function showALL() {
    for(let i=1;i<58;i++){
        $("#"+i).show().css('display', 'flex');
    }
}

function style_Supermarks_1_0() {
    return {
        pane: 'pane_Supermarks_1',
        radius: 8.0,
        opacity: 1,
        color: 'rgba(128,17,25,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 2.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(219,30,42,1.0)',
        interactive: true,
    }
}

function pop_Supermarks_1(feature, layer) {
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link("שם:" + feature.properties['Name'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Address'] !== null ? autolinker.link("כתובת:" + feature.properties['Address'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}

function showAllSupermarket(map) {
    if (currentLayer != undefined) {
        map.removeLayer(currentLayer);
    }
    showALL();
    let layer_Supermarks_1 = new L.geoJson(json_Supermarks_1, {
        attribution: '',
        interactive: true,
        dataVar: 'json_Supermarks_1',
        layerName: 'layer_Supermarks_1',
        pane: 'pane_Supermarks_1',
        onEachFeature: pop_Supermarks_1,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            features.push(feature);
            return L.circleMarker(latlng, style_Supermarks_1_0(feature));
        },
    });
    currentLayer = layer_Supermarks_1;
    bounds_group.addLayer(layer_Supermarks_1);
    map.addLayer(layer_Supermarks_1);
    if(flag==0)
        setDetails();

    for(let i=1;i<58;i++) {    
        let button = document.getElementById(i);   
        button.addEventListener("mouseover",function() { 
            removeMarker(map);                       
            let latLng = new L.LatLng(features[i-1].geometry['coordinates'][1],features[i-1].geometry['coordinates'][0]);
            map.setView(latLng, 15);                 
            let marker = L.marker(latLng).addTo(map);
            currentmarker = marker
        });
        button.addEventListener("click",function() {
            removedetails();
            let elem = document.getElementById('details'+i);
            $(elem).show();
            currentDetail= elem;
        });       
    }
}

function removeMarker(map) {
    if(currentmarker != undefined)
       map.removeLayer(currentmarker)
}

function removedetails() {
    if(currentDetail !=undefined)
                $(currentDetail).hide();
}

function setDetails() {
    for(let i=1;i<58;i++) {
        if(features[i-1].info['hours'].length<2) {
            let elem = document.createElement("div");
            $(elem).append("<h2>"+features[i-1].properties['Name']+"</h2>"+"<p><b>Address:</b>" +" "+features[i-1].properties['Address']+"</p>"+"<p><b>Open:</b>" +" "+features[i-1].info['hours'][0]+"</p>"+
            "<p><b>Rate:</b>" + " " +features[i-1].info['rate']+"</p>").attr("id","details"+i);
            $("#details").append(elem);
        }
          
       else {
        let elem = document.createElement("div");
        $(elem).append("<h2>"+features[i-1].properties['Name']+"</h2>"+"<p><b>Address:</b>" + " " +features[i-1].properties['Address']+"</p>"+"<p><b>Sunday:</b>"+ " " +
        features[i-1].info['hours'][0]+"<br>"+"<b>Monday:</b>"+ " " +features[i-1].info['hours'][1]+"<br>"+"<b>Tuesday:</b>"+ " " +features[i-1].info['hours'][2]+
        "<br>"+"<b>Wednesday:</b>"+ " " +features[i-1].info['hours'][3]+"<br>"+"<b>Tursday:</b>"+ " " + features[i-1].info['hours'][4]+"<br>"+
        "<b>Friday:</b>"+ " " + features[i-1].info['hours'][5]+"<br>"+"<b>Saturday:</b>"+ " " +features[i-1].info['hours'][6]+"</p>"+
        "<p><b>Rate:</b>"+ " " +features[i-1].info['rate']+"</p>").attr("id","details"+i);   
        $("#details").append(elem);   
       }             
       $("#details"+i).hide();              
    }
    flag=1;       
}
