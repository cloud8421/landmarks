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
    console.log("Locations:", radius);
    this.apiEndpoint.radius = radius;
    this.fetch();
  },
  parse: function (self) {
    var data = JSON.parse(this.responseText);
    self.locations = data.articles;
    console.table(self.locations);
    Landmarks.PubSub.pub('landmarks');
  },
  fetch: function() {
    var req = new Landmarks.Request();
    req.loadUrl(this.apiEndpoint.toUrl(), this.parse, this);
    return this;
  }
}
