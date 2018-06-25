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
import * as jwt from "jsonwebtoken";

const PORT = 3001;

const app = express();

const tokenSecret = "AAJZIJAZJAKZJAE"; // todo: put in config too

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

// bodyParser is needed just for POST.
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // if you want GraphiQL enabled

//login route for passport
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const expires = 1440 * 60 * 30; // 30 days

app.post("/api/auth/login", async (req, res) => {
  console.log("Body: ", req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log("Login ", email, password);
  const dbUser = await User.findOne({
    where: {
      email,
    },
  });
  if (!dbUser) {
    res.status(401).send("User or password incorrect");
    return;
  }
  console.log("User: ", dbUser);
  const isValid = await verifyPassword(dbUser, password);
  if (!isValid) {
    res.status(401).send("User or password incorrect");
    return;
  }

  const user = pick(dbUser, [
    "firstName",
    "lastName",
    "email",
    "isAdmin",
    "id",
  ]);
  const token = jwt.sign(user, tokenSecret, {
    expiresIn: expires,
  });

  res.send({ token, user });
});

app.post("/api/auth/re-auth", (req, res) => {
  const token = req.body.token;
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid token");
      } else {
        res.status(200).json({ token, user: decoded });
      }
    });
  } else {
    res.status(401).send("Invalid token");
  }
});

console.log("Listening on port ", PORT);
app.listen(PORT);
