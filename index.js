var currentArea;
function initMap() {

  var parkingAreas = [

    new ParkArea("Dipoli1", 3, [
      { lat: 60.185500, lng: 24.832000 },
      { lat: 60.184800, lng: 24.831200 },
      { lat: 60.184649, lng: 24.832500 },
      { lat: 60.185200, lng: 24.833200 },
    ], "Dipoli demo area 1"),

    new ParkArea("A", 5, [
      { lat: 60.187897, lng: 24.817114 },
      { lat: 60.187278, lng: 24.822802 },
      { lat: 60.186467, lng: 24.822302 },
      { lat: 60.186958, lng: 24.816837 }
    ], "ilmaisia tiensivupaikkoja"),

    new ParkArea("B", 5, [
      { lat: 60.186908, lng: 24.822785 },
      { lat: 60.18598, lng: 24.826146 },
      { lat: 60.188766, lng: 24.829486 },
      { lat: 60.189443, lng: 24.824885 },
      { lat: 60.188296, lng: 24.823512 }],
      "maksullisia paikkoja"),

    new ParkArea("Otakaari", 10, [
      { lat: 60.188787, lng: 24.829688 },
      { lat: 60.189536, lng: 24.829764 },
      { lat: 60.190312, lng: 24.831174 },
      { lat: 60.190324, lng: 24.831692 },
      { lat: 60.190256, lng: 24.832085 },
      { lat: 60.189308, lng: 24.833945 },
      { lat: 60.189048, lng: 24.834174 },
      { lat: 60.189098, lng: 24.834381 },
      { lat: 60.189342, lng: 24.834201 },
      { lat: 60.190288, lng: 24.832359 },
      { lat: 60.190445, lng: 24.831708 },
      { lat: 60.190386, lng: 24.830861 },
      { lat: 60.189726, lng: 24.82971 },
      { lat: 60.189586, lng: 24.82955 },
      { lat: 60.188846, lng: 24.829511 }], "ilmaisia tiensivupaikkoja"),

    new ParkArea("D", 5, [
      { lat: 60.19063, lng: 24.833971 },
      { lat: 60.190741, lng: 24.834881 },
      { lat: 60.190817, lng: 24.835414 },
      { lat: 60.190898, lng: 24.835593 },
      { lat: 60.19094, lng: 24.835521 },
      { lat: 60.190879, lng: 24.835373 },
      { lat: 60.19068, lng: 24.833883 }], "muutama tiensivupaikka, ilmaisia"),

    new ParkArea("E", 40, [
      { lat: 60.185926, lng: 24.835713 },
      { lat: 60.185939, lng: 24.837251 },
      { lat: 60.184927, lng: 24.837309 },
      { lat: 60.184966, lng: 24.835842 }], "urheilupuiston parkkipaikka"),

    new ParkArea("F", 10, [
      { lat: 60.183183, lng: 24.827766 },
      { lat: 60.18293, lng: 24.827215 },
      { lat: 60.182433, lng: 24.828231 },
      { lat: 60.182682, lng: 24.828904 }], "Sportsfield free parking"),

    new ParkArea("G", 20, [
      { lat: 60.179697, lng: 24.8277 },
      { lat: 60.179069, lng: 24.828015 },
      { lat: 60.179222, lng: 24.829053 },
      { lat: 60.180005, lng: 24.828567 }], "Free parking on weekends"),

    new ParkArea("H", 5, [
      { lat: 60.187907, lng: 24.837418 },
      { lat: 60.187893, lng: 24.837475 },
      { lat: 60.187676, lng: 24.83705 },
      { lat: 60.187722, lng: 24.83696 }], "Museum parking")

  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: polygonCenter(parkingAreas[0].polygon),
    mapTypeId: 'terrain'
  });

  var infowindow = new google.maps.InfoWindow({
    position: polygonCenter(parkingAreas[0].polygon),
    content: parkingAreas[0].info
  });

  // create user
  var userPos = {
    lat: 0,
    lng: 0
  };
  var d = new Date();
  var startTime = 10; // initialize test user with 10 minutes of parking time;
  var user = new User(userPos, startTime);

  parkingAreas.forEach(function (element) {
    initialize(element, map, infowindow);
  });
  var locationWindow = new google.maps.InfoWindow();

    function CenterControl(controlDiv, map) {
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.borderRadius = '3px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlUI.style.cursor = 'pointer';
      controlUI.style.marginBottom = '22px';
      controlUI.style.textAlign = 'center';
      controlUI.title = 'Click to recenter the map';
      controlDiv.appendChild(controlUI);

      var controlText = document.createElement('div');
      controlText.style.color = 'rgb(25,25,25)';
      controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      controlText.style.fontSize = '16px';
      controlText.style.lineHeight = '38px';
      controlText.style.paddingLeft = '5px';
      controlText.style.paddingRight = '5px';
      controlText.innerHTML = 'Locate Me';
      controlUI.appendChild(controlText);

      controlUI.addEventListener('click', function() {
          locate(locationWindow, map, parkingAreas);
      });
    }

  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

}

function parkButtonTest(){
    this.currentArea.parkHere();
}

function locate(locationWindow, map, parkingAreas) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      locationWindow.setPosition(pos);
      locationWindow.setContent('You are not inside a TrePark area. Parking here will not earn you minutes.');
      locationWindow.open(map);
      map.setCenter(pos);

      var success = null;

      for (var i = 0; i < parkingAreas.length; i++) {
        var current = parkingAreas[i];
        if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(pos.lat, pos.lng), current.polygon)) {
          locationWindow.setContent("You are inside a TrePark area. Park here to earn minutes");
          success = current;
          this.currentArea = current;
          console.log(this.currentArea);
          return success;
        }
         
      }

    }, function () {
      handleLocationError(true, locationWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, locationWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, locationWindow, pos) {
    locationWindow.setPosition(pos);
    locationWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    locationWindow.open(map);
  }
}

function park(parkArea, user) {
  parkArea.parkHere();
  //user.setParked(true);
  user.parked = true;
  return new ParkingEvent(user, d.getTime(), parkArea);
}

function leave(parkArea) {
  parkArea.leave();
}

function leave(parkArea, parkingEvent) {
  parkArea.leave();
  //user.setParked(false);
  //user.setTime(parkingEvent.getDuration());
  user.parked = false;
  user.time = parkingEvent.getDuration();
}

function initialize(parkArea, map, infowindow) {

  parkArea.polygon.setMap(map);
  parkArea.polygon.addListener('click', function () {
    map.panTo(polygonCenter(parkArea.polygon));
    infowindow.position = polygonCenter(parkArea.polygon);
    infowindow.setContent(parkArea.info);
    infowindow.open(map);
  });
}

function polygonCenter(poly) {
  var lowx,
    highx,
    lowy,
    highy,
    lats = [],
    lngs = [],
    vertices = poly.getPath();

  for (var i = 0; i < vertices.length; i++) {
    lngs.push(vertices.getAt(i).lng());
    lats.push(vertices.getAt(i).lat());
  }

  lats.sort();
  lngs.sort();
  lowx = lats[0];
  highx = lats[vertices.length - 1];
  lowy = lngs[0];
  highy = lngs[vertices.length - 1];
  center_x = lowx + ((highx - lowx) / 2);
  center_y = lowy + ((highy - lowy) / 2);
  return (new google.maps.LatLng(center_x, center_y));
}