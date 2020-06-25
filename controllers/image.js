const Clarifai = require("clarifai");
const app = new Clarifai.App({ apiKey: "6b185f1992e2459e8c3d3c6b7e240cd0" });

const handleApiCall = (req, res) => {
  const { imgUrl } = req.body;
  app.models
    .predict("e15d0f873e66047e579f90cf82c9882z", imgUrl)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error making API call"));
};
const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Error getting entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
