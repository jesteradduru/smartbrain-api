const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  version: "8.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "r0ckmygam3",
    database: "dbsmartbrain",
  },
});

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(db.users);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});

app.post("/register", (req, res) =>
  register.handleRegister(req, res, bcrypt, db)
);

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/detectImage", (req, res) => {
  image.handleApiCall(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is running in port ${PORT}`);
});
