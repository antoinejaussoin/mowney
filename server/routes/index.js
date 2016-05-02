function initialiseRoutes(app) {
    //app.use('/', require('./root'));
    //app.use('/register', require('./register'));
    app.use('/api/account', require('./api/account'));
    app.use('/api/transaction', require('./api/transaction'));
    app.use('/api/currency', require('./api/currency'));
    app.use('/api/loader', require('./api/loader'));
    app.use('/api', require('./api/api'));
}

module.exports = initialiseRoutes;
