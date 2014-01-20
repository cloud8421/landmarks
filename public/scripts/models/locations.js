window.Landmarks.Locations = function() {
  this.apiEndpoint = 'http://api.wikilocation.org/articles?lat=51.500688&lng=-0.124411&limit=5';
  this.locations = [];
  return this;
}

window.Landmarks.Locations.prototype = {
  parse: function (self) {
    var data = JSON.parse(this.responseText);
    self.locations = data.articles;
  },
  fetch: function() {
    var req = new Landmarks.Request();
    req.loadUrl(this.apiEndpoint, this.parse, this);
    return this;
  }
}

window.locations = new Landmarks.Locations;
locations.fetch();
