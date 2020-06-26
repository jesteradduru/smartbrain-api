const handleRegister = (req, res, bcrypt, db) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    db.transaction((trx) => {
      trx
        .insert({ hash: hash, email: email })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return db("users")
            .returning("*")
            .insert({ name, email: loginEmail[0], joined: new Date() })
            .then((user) => res.json(user[0]))
            .catch((err) => res.status(400).json("Unable to register!"));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => res.status(400).json("Unable to register"));
  });
};

module.exports = {
  handleRegister,
};
