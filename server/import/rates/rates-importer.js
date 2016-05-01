var moment = require('moment');
var request = require('request');
var parser = require('./rates-parser');
var async = require('async');
var _ = require('lodash');

function importRates(from, to, fromCurrency, toCurrency, cb) {
    // 'http://currencies.apps.grandtrunk.net/getrange/2014-01-01/2014-02-01/usd/eur';
    var chunks = getChunks(from, to);

    console.log('Found ' + chunks.length + ' chunks');
    console.log(chunks);

    async.mapSeries(chunks, importOneChunkFn(fromCurrency, toCurrency), function (err, results) {
        if (err && err !== 'over quota')
            return cb(err);

        return cb(null, _.flatten(results));
    });
}

function importOneChunkFn(fromCurrency, toCurrency) {
    return function (chunk, cb) {
        importOneChunk(chunk.from, chunk.to, fromCurrency, toCurrency, cb);
    }
}

function importOneChunk(from, to, fromCurrency, toCurrency, cb) {
    var dateFormat = 'YYYY-MM-DD';
    var url = 'http://currencies.apps.grandtrunk.net/getrange/' + moment(from).format(dateFormat) + '/' + moment(to).format(dateFormat) + '/' + fromCurrency + '/' + toCurrency;
    console.log('url = ' + url);
    request.get(url, function (err, res, body) {
        //console.log(body);

        if (body.indexOf('over quota') > -1) {
            console.log('We just went over quota, aborting');
            return cb('over quota', []);
        }

        parser(body, function (err, parsed) {
            if (err)
                return cb(err);

            console.log(JSON.stringify(parsed));
            return cb(null, parsed);
        });
    });
}



function getChunks(from, to) {
    var chunkSize = 30;
    var numberOfDays = moment(to).diff(moment(from), 'days');

    if (numberOfDays < chunkSize)
        return [{
            from: from,
            to: to
        }];

    var current = from;
    var chunks = [];

    while (current < to) {
        var next = moment(current).add(chunkSize, 'days');
        if (next > to)
            next = to;
        chunks.push({
            from: current,
            to: next
        });

        current = next;
    }

    return chunks;
}


module.exports = importRates;