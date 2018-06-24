import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './data/schema';
import * as passport from 'passport';
import * as session from 'express-session';
import uuid from 'node-uuid';
import initPassport from './auth';

const PORT = 3000;

const app = express();

initPassport(passport);

app.use(session({
  genid: function(req) {
    return uuid.v4();
  },
  secret: 'QIJDSQSHNIQSID82939H' // todo put in config
 }));
app.use(passport.initialize());
app.use(passport.session());

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

//login route for passport
app.use(bodyParser.urlencoded({ extended: true }) );
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}) );

console.log('Listening on port ', PORT);
app.listen(PORT);