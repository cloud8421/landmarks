window.Landmarks.Api = function() {
  this.apiEndpoint = 'http://api.wikilocation.org/articles';
  this.lat = 0;
  this.lng = 0;
  this.radius = 100;
  this.limit = 30;
  this.type = 'landmark';
  return this;
}

window.Landmarks.Api.prototype = {
  toUrl: function() {
    var str = [];
    var self = this;
    ['lat', 'lng', 'radius', 'limit', 'type'].forEach(function (key) {
      str.push(encodeURIComponent(key) + "=" + encodeURIComponent(self[key]));
    });
    return this.apiEndpoint + '?' + str.join("&");
  }
}
