module.exports = {
  body: (...allowedKeys) => {
    return (req, res, next) => {
      const { body } = req;
      const sanitizedKey = Object.key(body).filter((key) => {
        allowedKeys.includes(key);
      });

      // Apakah jumlah key di body sesuai dengan jumlah di allowedKeys
      if (body.length != allowedKeys.length) {
        return res.status(400).json({ msg: "keys salah" });
      }
      const newBody = {};
      for (let key of sanitizedKey) {
        Object.assign(newBody, { [key]: body[key] });
      }
      // jika newBody kosong, response 400 bad request
      if ((newBody.length = 0)) {
        return res.status(400).json({ msg: "bad request" });
      }
      req.body = newBody;
      next();
    };
  },
};
