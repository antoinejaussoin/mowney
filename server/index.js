var debug = require('debug')('web');
var app = require('./web-server');
var models = require('./models');
var rateUpdater = require('./loaders/rate-updater');
var moment = require('moment');

app.set('port', process.env.PORT || 3000);

models.init();

models.sequelize.sync({

}).then(function () {

    //rateUpdate();

    var server = app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });

}, function (err) {
    console.error(err);
});

function rateUpdate() {
    rateUpdater().then(function () {
        console.info('Rates updated at '+moment().format('DD/MM/YYYY HH:mm:ss'));
        setTimeout(function () {
            rateUpdate();
        }, 1000 * 60 * 60 * 24);
    });
}
