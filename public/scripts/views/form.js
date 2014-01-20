window.Landmarks.Form = function(options) {
  this.form = document.getElementById(options.form);
  this.distanceSelect = document.getElementById(options.distanceSelect);
  this.listenForSubmit();
  return this;
}

window.Landmarks.Form.prototype = {
  getDistance: function () {
    return this.distanceSelect.value;
  },
  search: function (event) {
    event.preventDefault();
    Landmarks.PubSub.pub('distance', this.getDistance());
  },
  listenForSubmit: function () {
    this.form.addEventListener('submit', this.search.bind(this), false);
  }
}
