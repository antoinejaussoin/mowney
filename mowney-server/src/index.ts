import * as express from "express";
import * as bodyParser from "body-parser";
import { pick } from "lodash";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import schema from "./data/schema";
import { User } from "./data/models";
import { verifyPassword } from "./data/models/user";
import * as passport from "passport";
import * as session from "express-session";
import * as uuid from "node-uuid";
import * as jwt from "express-jwt";

const PORT = 3001;

const app = express();

app.use(
  session({
    genid: function(req) {
      return uuid.v4();
    },
    secret: "QIJDSQSHNIQSID82939H", // todo put in config
  }),
);
app.use(passport.initialize());
app.use(passport.session());

const auth = jwt({
  secret: "todo", // process.env.JWT_SECRET,
  credentialsRequired: false,
});

interface IRequest extends express.Request {
  user: string;
}

// bodyParser is needed just for POST.
app.use(
  "/graphql",
  bodyParser.json(),
  auth,
  graphqlExpress((req: IRequest) => ({
    schema,
    context: {
      user: req.user,
    },
  })),
);
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // if you want GraphiQL enabled

//login route for passport
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const expires = 1440 * 60 * 30; // 30 days

console.log("Listening on port ", PORT);
app.listen(PORT);
