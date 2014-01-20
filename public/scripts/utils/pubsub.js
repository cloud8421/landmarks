window.Landmarks.PubSub = {
  pub: function(name, data) {
    var e;
    e = document.createEvent("Event");
    e.initEvent(name, true, true);
    e.customData = data;
    return document.body.dispatchEvent(e);
  },
  sub: function(name, callback, context) {
    return document.body.addEventListener(name, (function(e) {
      return callback.call(context, e.customData, e);
    }), true);
  }
};
