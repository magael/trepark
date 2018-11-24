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
    fillOpacity: 0.25
  });
    this.info = info;
    this.parkHere = function() {
    	this.takenSpots++;
    	this.updateColor();
    }
    this.leave = function() {
    	this.takenSpots--;
    	this.updateColor();
    }
    this.updateColor = function() {
    	if ((this.takenSpots/this.capacity) < 0.5) {
    		this.polygon.strokeColor = '#00B32C';
    		this.polygon.fillColor = '#00B32C';
    		return;
    	} 
    	if ((this.takenSpots/this.capacity) < 0.8) {
    		this.polygon.strokeColor = '#FFFF00';
    		this.polygon.fillColor = '#FFFF00';
    		return;
    	}
    	if ((this.takenSpots/this.capacity) < 0.9) {
    		this.polygon.strokeColor = '#FFCC00';
    		this.polygon.fillColor = '#FFCC00';
    		return;
    	}

    	this.polygon.strokeColor = '#FF0000';
    	this.polygon.fillColor = '#FF0000';

    }
}
