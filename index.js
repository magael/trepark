function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 24.886, lng: -70.268},
    mapTypeId: 'terrain'
  });

  var contentString = "bla";


 
var areaA = new ParkArea("A", 5, [
    {lat: 60.187897, lng: 24.817114},
    {lat: 60.187278, lng: 24.822802},
    {lat: 60.186467, lng: 24.822302},
    {lat: 60.186958, lng: 24.816837}
    ], "ilmaisia tiensivupaikkoja");



var bermudaTriangle = new ParkArea("A", 5, [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ], "vain ilmaisia tiensivupaikkoja");

  bermudaTriangle.polygon.setMap(map);
  bermudaTriangle.polygon.addListener('click', function(){
      map.panTo(polygonCenter(bermudaTriangle.polygon));
      infowindow.open(map);
  });

  var infowindow = new google.maps.InfoWindow({
          content: contentString,
          position: polygonCenter(bermudaTriangle.polygon)
        });
  initialize(areaA, map, infowindow);

}


function park(parkArea) {
    parkArea.parkHere();
     console.log(parkArea.takenSpots + " " + parkArea.capacity);
}

function leave(parkArea) {
    parkArea.leave();
    console.log(parkArea.takenSpots + " " + parkArea.capacity);
}

function initialize(parkArea, map, infowindow) {
    parkArea.polygon.setMap(map);
    parkArea.polygon.addListener('click', function(){
      map.panTo(polygonCenter(parkArea.polygon));
      infowindow.content = parkArea.info;
      infowindow.position = polygonCenter(parkArea.polygon);
      infowindow.open(map);

});}




function polygonCenter(poly) {
    var lowx,
        highx,
        lowy,
        highy,
        lats = [],
        lngs = [],
        vertices = poly.getPath();

    for(var i=0; i<vertices.length; i++) {
      lngs.push(vertices.getAt(i).lng());
      lats.push(vertices.getAt(i).lat());
    }

    lats.sort();
    lngs.sort();
    lowx = lats[0];
    highx = lats[vertices.length - 1];
    lowy = lngs[0];
    highy = lngs[vertices.length - 1];
    center_x = lowx + ((highx-lowx) / 2);
    center_y = lowy + ((highy - lowy) / 2);
    return (new google.maps.LatLng(center_x, center_y));
  }

