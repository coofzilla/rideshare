//this logic "can" live in routes but refactored here for cleanliness
module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  create(req, res) {
    console.log(req.body);
    res.send({ hi: "there create" });
  },
};
