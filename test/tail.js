var it = require('tape'),
    papertrailStream = require('..');

var token = process.env.PAPERTRAIL_TOKEN;

it('should be able to tail papertrail', function(t) {
  t.plan(3);
  var query = {};
  var count = 0;
  papertrailStream(token, query, false)
    .on('data', function (data) {
      if (count++ < 3) {
        t.deepEqual(Object.keys(data),
          [ 'id',
            'source_ip',
            'program',
            'message',
            'received_at',
            'generated_at',
            'display_received_at',
            'source_id',
            'source_name',
            'hostname',
            'severity',
            'facility' ]);
      }
      if (count === 3) {
        t.end();
        process.exit();
      }
    })
});
