const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token_with_bearer = req.header("Authorization");

  if (token_with_bearer != null && token_with_bearer.startsWith("Bearer ")) {
    const token = token_with_bearer.substring(7);

    try {

      const decoded = jwt.verify(token, process.env.JWT);
      req.user = decoded;

    } catch (error) {

      return res.status(401).send({
        ok: false,
        error: "Token expired"
      });

    }
  }

  else {
    res.status(401).send({
      ok: false,
      error: "Access denied. No token provided"
    });
  }


  next();
}