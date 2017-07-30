const debug = require('debug')('web');
const app = require('./web-server');
const models = require('./models');
const rateUpdater = require('./loaders/rate-updater');
const moment = require('moment');

app.set('port', process.env.PORT || 3000);

models.init();

models.sequelize.sync({

}).then(() => {
  // rateUpdate();

  var server = app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${server.address().port}`);
  });
}, (err) => {
  console.error(err);
});

function rateUpdate() {
  rateUpdater().then(() => {
    console.info(`Rates updated at ${moment().format('DD/MM/YYYY HH:mm:ss')}`);
    setTimeout(() => {
      rateUpdate();
    }, 1000 * 60 * 60 * 24);
  });
}
