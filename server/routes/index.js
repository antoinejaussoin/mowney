const isAuthenticated = require('../middlewares/isAuthenticated');

function initialiseRoutes(app) {
    app.use('/api/auth', require('./api/auth'));
    //app.use('/register', require('./register'));
    app.use('/api/account', isAuthenticated, require('./api/account'));
    app.use('/api/transaction', isAuthenticated, require('./api/transaction'));
    app.use('/api/currency', isAuthenticated, require('./api/currency'));
    app.use('/api/loader', isAuthenticated, require('./api/loader'));
    app.use('/api', require('./api/api'));
}

module.exports = initialiseRoutes;
