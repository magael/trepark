function ParkArea(name, capacity, coordinateArray, info) {
    this.name = name;
    this.takenSpots = 0;
    this.capacity = capacity;
    this.polygon = new google.maps.Polygon({
    paths: coordinateArray,
    strokeColor: '#00B32C',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#00B32C',
    fillOpacity: 0.4
  });
    this.info = info;
    this.parkHere = function() {
    	this.takenSpots++;
    	this.updateColor();
    };
    this.leave = function() {
    	this.takenSpots--;
    	this.updateColor();
    };
    this.updateColor = function() {
    	if ((this.takenSpots/this.capacity) < 0.5) {
    		this.polygon.setOptions({fillColor: '#00B32C', strokeColor:'#00B32C'});
    		return;
    	} 
    	if ((this.takenSpots/this.capacity) < 0.8) {
    		this.polygon.setOptions({fillColor: '#FFFF00', strokeColor: '#FFFF00'});
    		return;
    	}
    	if ((this.takenSpots/this.capacity) < 0.9) {
    		this.polygon.setOptions({fillColor: '#FFCC00', strokeColor: '#FFCC00'});
    		return;
    	}
    	this.polygon.setOptions({fillColor: '#FF0000', strokeColor:'#FF0000'});
    };
}
