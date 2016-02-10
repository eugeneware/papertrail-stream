var stream = require('stream'),
    url = require('url'),
    request = require('request');

var baseUrl = 'https://papertrailapp.com/api/v1/';

module.exports = papertrailStream;
function papertrailStream(token, query, reverse) {
  var r = stream.Readable({ objectMode: true });
  r._read = function () {};

  var min_id = query.min_id || null;
  var max_id = query.max_id || null;

  function fetch() {
    if (min_id) {
      query.min_id = min_id;
    } else {
      delete query.min_id;
    }

    if (max_id) {
      query.max_id = max_id;
    } else {
      delete query.max_id;
    }

    api(token, query, function (err, data) {
      if (err) {
        console.error(err);
        r.emit('error', err);
        r.push(null);
        return;
      }

      if (reverse) {
        max_id = data.min_id;
      } else {
        min_id = data.max_id;
      }

      if (reverse) {
        data.events.reverse();
      }

      data.events.forEach(function (evt) {
        r.push(evt);
      });

      if (data.reached_beginning || data.reached_end) {
        r.push(null);
      } else {
        setTimeout(fetch, 500);
      }
    });
  }

  setImmediate(fetch);

  return r;
}

function api(token, query, cb) {
  request({
      url: baseUrl + 'events/search.json',
      qs: query,
      headers: {
        'X-Papertrail-Token': token
      }
    },
    function (err, response, body) {
      if (err) return cb(err);
      if (response.statusCode == 200) {
        try {
          var info = JSON.parse(body);
          return cb(null, info);
        } catch (e) {
          return cb(e);
        }
      } else {
        return cb(new Error('Bad HTTP Response: ' + response.statusCode));
      }
    });
}
