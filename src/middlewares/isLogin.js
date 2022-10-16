const jwt = require("jsonwebtoken");
module.exports = () => {
  return (req, res, next) => {
    const token = req.header("token-set");
    console.log(req.header);
    if (!token)
      return res.status(401).json({ msg: "please login first", data: null });

    jwt.verify(
      token,
      process.env.SECRET_KEY,
      { issuer: process.env.ISSUER },
      (err, decodedPayload) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: "internal server error", data: null });
        }
        req.decodedPayload = decodedPayload;
        next();
      }
    );
  };
};
