function User(pos, time) {
    this.time = time;
    this.pos = pos;

    this.setTime(time) = function() {
        this.time = time;
    }

    this.setPos(pos) = function() {
        this.pos = pos;
    }

    this.getTime() = function() {
        return this.time;
    }

    this.getPos() = function() {
        return this.pos;
    }
}