const handleSignin = (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db("login")
    .select("*")
    .where({ email })
    .then((data) => {
      bcrypt.compare(password, data[0].hash, function (err, result) {
        if (result) {
          return db("users")
            .select("*")
            .where({ email })
            .then((user) => {
              user.length
                ? res.json(user[0])
                : res.status(400).json("Not found!");
            })
            .catch((err) => res.status(400).json("Wrong credentials"));
        } else {
          res.status(400).json("Error getting user");
        }
      });
    })
    .catch((err) => res.status(400).json("Error getting user"));
};

module.exports = {
  handleSignin,
};
