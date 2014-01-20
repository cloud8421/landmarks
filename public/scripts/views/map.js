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
  render: function() {
    var mapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(this.container, mapOptions);

    this.locations.locations.forEach(function(location) {
      var landmarkLatLng = new google.maps.LatLng(location.lat, location.lng);
      var marker = new google.maps.Marker({
          position: landmarkLatLng,
          title: location.title
      });
      marker.setMap(map);
    });

  }
}
