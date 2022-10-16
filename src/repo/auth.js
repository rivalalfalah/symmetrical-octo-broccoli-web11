const db = require("../config/postgre");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

module.exports = {
  login: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;

      const getPwdByEmailQuery =
        "select id,email,password from users where email = $1";

      const getPwdByEmailValues = [email];
      db.query(getPwdByEmailQuery, getPwdByEmailValues, (err, response) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (response.rows.length === 0)
          return reject({
            err: new Error("Email/password is wrong"),
            statusCode: 401,
          });

        const hashedPassword = response.rows[0].password;
        bcrypt.compare(password, hashedPassword, (err, isSame) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          if (!isSame)
            return reject({
              err: new Error("email/password is wrong"),
              statusCode: 401,
            });
          const payLoad = {
            user_id: response.rows[0].id,
            email,
          };
          jwt.sign(
            payLoad,
            process.env.SECRET_KEY,
            {
              expiresIn: "5m",
              issuer: process.env.ISSUER,
            },
            (err, token) => {
              if (err) {
                console.log(err);
                return reject(err);
              }
              return resolve({ token, payLoad });
            }
          );
        });
      });
    });
  },
};
