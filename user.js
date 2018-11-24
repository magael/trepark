function User(pos, time) {
    // pos = lat, lng
    // time = minutes left on account
    this.time = time;
    this.pos = pos;
    this.parked = false;

    this.setTime(time) = function() {
        this.time = time;
    }

    this.setPos(pos) = function() {
        this.pos = pos;
    }

    this.setPos(lat, lng) = function() {
        this.pos.lat = lat;
        this.pos.lng = lng;
    }

    this.setParked(parked) = function() {
        this.parked = parked;
    }

    this.getTime() = function() {
        return this.time;
    }

    this.getPos() = function() {
        return this.pos;
    }

    this.getParked() = function() {
        return this.parked;
    }
}