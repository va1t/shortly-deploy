var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linkschema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

var Link = mongoose.model('Link', linkschema);
linkschema.pre('save', function() {
  var hash = crypto.createHash('sha1');
  hash.update(this.url);
  this.code = hash.digest('hex').slice(0, 5);
});

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
