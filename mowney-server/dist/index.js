"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var apollo_server_express_1 = require("apollo-server-express");
var schema_1 = require("./data/schema");
var passport = require("passport");
var session = require("express-session");
var node_uuid_1 = require("node-uuid");
var auth_1 = require("./auth");
var PORT = 3000;
var app = express();
auth_1.default(passport);
app.use(session({
    genid: function (req) {
        return node_uuid_1.default.v4();
    },
    secret: 'QIJDSQSHNIQSID82939H' // todo put in config
}));
app.use(passport.initialize());
app.use(passport.session());
// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), apollo_server_express_1.graphqlExpress({ schema: schema_1.default }));
app.get('/graphiql', apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
//login route for passport
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
console.log('Listening on port ', PORT);
app.listen(PORT);
