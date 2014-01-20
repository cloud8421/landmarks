window.Landmarks.Locations = function(lat, lng) {
  this.locations = [];
  this.apiEndpoint = new Landmarks.Api();
  this.apiEndpoint.lat = lat;
  this.apiEndpoint.lng = lng;
  Landmarks.PubSub.sub('distance', this.setDistance, this);
  return this;
}

window.Landmarks.Locations.prototype = {
  setDistance: function (radius) {
    this.apiEndpoint.radius = radius;
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
