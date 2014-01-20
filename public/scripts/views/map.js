window.Landmarks.Map = function(container, lat, lng) {
  this.container = document.getElementById(container);
  this.lat = lat;
  this.lng = lng;
  this.locations = new Landmarks.Locations(lat, lng);
  Landmarks.PubSub.sub('landmarks', this.render, this);
  Landmarks.PubSub.sub('coords', this.setCoords, this);
  return this;
}

window.Landmarks.Map.prototype = {
  setCoords: function (coords) {
    this.lat = coords.lat;
    this.lng = coords.lng;
  },
  drawMarker: function(location) {
    var landmarkLatLng = new google.maps.LatLng(location.lat, location.lng);
    var infowindow = new google.maps.InfoWindow({
      content: location.title
    });
    var marker = new google.maps.Marker({
      position: landmarkLatLng,
      title: location.title
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(this.map, marker);
    });
    marker.setMap(this.map);
  },
  render: function() {
    var center = new google.maps.LatLng(this.lat, this.lng);
    var mapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.container, mapOptions);

    var currentPosition = new google.maps.Marker({
      position: center,
      title: 'Your position',
      type: 'circle',
      icon: 'images/current.png'
    });

    currentPosition.setMap(this.map);

    var drawMapCallback = this.drawMarker.bind(this);
    this.locations.locations.forEach(drawMapCallback);
  }
}
