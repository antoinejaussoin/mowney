const moment = require('moment');
const request = require('request');
const parser = require('./rates-parser');
const async = require('async');
const _ = require('lodash');

function importRates(from, to, fromCurrency, toCurrency, cb) {
  // 'http://currencies.apps.grandtrunk.net/getrange/2014-01-01/2014-02-01/usd/eur';
  const chunks = getChunks(from, to);

  console.log(`Found ${chunks.length} chunks`);
  console.log(chunks);

  async.mapSeries(chunks, importOneChunkFn(fromCurrency, toCurrency), (err, results) => {
    if (err && err !== 'over quota') { return cb(err); }

    return cb(null, _.flatten(results));
  });
}

function importOneChunkFn(fromCurrency, toCurrency) {
  return function (chunk, cb) {
    importOneChunk(chunk.from, chunk.to, fromCurrency, toCurrency, cb);
  };
}

function importOneChunk(from, to, fromCurrency, toCurrency, cb) {
  const dateFormat = 'YYYY-MM-DD';
  const url = `http://currencies.apps.grandtrunk.net/getrange/${moment(from).format(dateFormat)}/${moment(to).format(dateFormat)}/${fromCurrency}/${toCurrency}`;
  console.log(`url = ${url}`);
  request.get(url, (err, res, body) => {
    // console.log(body);

    if (body.indexOf('over quota') > -1) {
      console.log('We just went over quota, aborting');
      return cb('over quota', []);
    }

    parser(body, (err, parsed) => {
      if (err) { return cb(err); }

      console.log(JSON.stringify(parsed));
      return cb(null, parsed);
    });
  });
}


function getChunks(from, to) {
  const chunkSize = 30;
  const numberOfDays = moment(to).diff(moment(from), 'days');

  if (numberOfDays < chunkSize) {
    return [{
      from,
      to
    }];
  }

  let current = from;
  const chunks = [];

  while (current < to) {
    let next = moment(current).add(chunkSize, 'days');
    if (next > to) { next = to; }
    chunks.push({
      from: current,
      to: next
    });

    current = next;
  }

  return chunks;
}


module.exports = importRates;
