window.Landmarks.Geolocation = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    Landmarks.PubSub.pub('coords', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  });
  return this;
}
