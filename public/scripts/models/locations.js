window.Landmarks.Locations = function(lat, lng) {
  this.locations = [];
  this.apiEndpoint = new Landmarks.Api();
  this.apiEndpoint.lat = lat;
  this.apiEndpoint.lng = lng;
  Landmarks.PubSub.sub('distance', this.setDistance, this);
  Landmarks.PubSub.sub('coords', this.setCoords, this);
  return this;
}

window.Landmarks.Locations.prototype = {
  setDistance: function (radius) {
    this.apiEndpoint.radius = radius;
    this.fetch();
  },
  setCoords: function (coords) {
    this.apiEndpoint.lat = coords.lat;
    this.apiEndpoint.lng = coords.lng;
    this.fetch();
  },
  parse: function (self) {
    var data = JSON.parse(this.responseText);
    self.locations = data.articles;
    Landmarks.PubSub.pub('landmarks');
  },
  fetch: function() {
    var req = new Landmarks.Request();
    req.loadUrl(this.apiEndpoint.toUrl(), this.parse, this);
    return this;
  }
}
