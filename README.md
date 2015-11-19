# papertrail-stream

Stream data from papertrail as a readable stream

[![build status](https://secure.travis-ci.org/eugeneware/papertrail-stream.png)](http://travis-ci.org/eugeneware/papertrail-stream)

## Installation

This module is installed via npm:

``` bash
$ npm install papertrail-stream
```

## Example - Tailing the Logs

Tail the papertrail logs with a query:

``` js
var papertrailStream = require('papertrail-stream');
var token = 'secret paper trail token';
var query = {
  system_id: 'cs-images-api',
  q: 'app/web GET /search/images?word='
};
papertrailStream(token, query, false)
  .on('data', function (data) {
    console.log('data');
  });

/*
  { id: '603964911848304647',
    source_ip: '54.204.189.196',
    program: 'app/web.4',
    message: '10.146.11.77 - GET /search/images?word=spain HTTP/1.1 200 18600 - 568.343 ms ',
    received_at: '2015-11-19T22:47:58+11:00',
    generated_at: '2015-11-19T22:47:58+11:00',
    display_received_at: 'Nov 19 22:47:58',
    source_id: 90276604,
    source_name: 'cs-images-api',
    hostname: 'cs-images-api',
    severity: 'Info',
    facility: 'Local7' }
  { id: '603965066064474115',
    source_ip: '50.17.107.126',
    program: 'app/web.2',
    message: '10.146.11.77 - GET /search/images?word=falling HTTP/1.1 200 19844 - 470.714 ms ',
    received_at: '2015-11-19T22:48:35+11:00',
    generated_at: '2015-11-19T22:48:35+11:00',
    display_received_at: 'Nov 19 22:48:35',
    source_id: 90276604,
    source_name: 'cs-images-api',
    hostname: 'cs-images-api',
    severity: 'Info',
    facility: 'Local7' }
*/
```

# Example - Going back through the history of the logs

Setting the last parameter to `true` iterates through the papertrail logs
backwards:

``` js
var papertrailStream = require('papertrail-stream');
var token = 'secret paper trail token';
var query = {
  system_id: 'cs-images-api',
  q: 'app/web GET /search/images?word='
};
papertrailStream(token, query, true)
  .on('data', function (data) {
    console.log('data');
  });

/*
  { id: '603965066064474115',
    source_ip: '50.17.107.126',
    program: 'app/web.2',
    message: '10.146.11.77 - GET /search/images?word=falling HTTP/1.1 200 19844 - 470.714 ms ',
    received_at: '2015-11-19T22:48:35+11:00',
    generated_at: '2015-11-19T22:48:35+11:00',
    display_received_at: 'Nov 19 22:48:35',
    source_id: 90276604,
    source_name: 'cs-images-api',
    hostname: 'cs-images-api',
    severity: 'Info',
    facility: 'Local7' }
  { id: '603964911848304647',
    source_ip: '54.204.189.196',
    program: 'app/web.4',
    message: '10.146.11.77 - GET /search/images?word=spain HTTP/1.1 200 18600 - 568.343 ms ',
    received_at: '2015-11-19T22:47:58+11:00',
    generated_at: '2015-11-19T22:47:58+11:00',
    display_received_at: 'Nov 19 22:47:58',
    source_id: 90276604,
    source_name: 'cs-images-api',
    hostname: 'cs-images-api',
    severity: 'Info',
    facility: 'Local7' }
*/
```
