function ParkingEvent(user, startingtime, parkingarea) {
    this.user = user;
    this.startingtime = startingtime;
    this.parkingarea = parkingarea;

    this.getDuration(currentTime) = function() {
        diff = currentTime - this.startingtime;
        return Math.floor((diff/1000)/60);
    }

}