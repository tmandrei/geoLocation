class GeoLocation {
    constructor() {
        this.html_block = document.getElementById("result")
        this.longitude = 0
        this.latitude = 0
        this.route = []
        this._Init()
        this.user = new userService()
        
    }

    _Init() {
        this.getGeoLocation()
    }

    getGeoLocation() {
        navigator.geolocation.watchPosition(setCoordinates.bind(this), geoError)
        function setCoordinates(position) {
            //this.longitude = position.coords.longitude
            //this.latitude = position.coords.latitude
            console.log(position.coords)
            console.group('Coords:')
            this.setLongitude(position.coords.longitude)
            this.setLatitude(position.coords.latitude)
            console.log('Lat:', this.getLatitude())
            console.log('Long:', this.getLongitude())
            console.groupEnd()
        }
        function geoError(err) {
            if (err.code == 1) {
                alert("You've decided not to share your position, but it's OK. We won't ask you again.")
            } else if (err.code == 2) {
                alert("The network is down or the positioning service can't be reached.");
            } else if (err.code == 3) {
                alert("The attempt timed out before it could get the location data.");
            } else {
                alert("Geolocation failed due to unknown error.");
            }
        }
    }

    getCoordinates() {
        return {date: new Date().toLocaleString(), latitude: this.getLatitude(), longitude: this.getLongitude()}
    }

    setLatitude(param) {
        this.latitude = param
    }

    setLongitude(param) {
        this.longitude = param
    }

    getLatitude() {
        return this.latitude
    }

    getLongitude() {
        return this.longitude
    }



}