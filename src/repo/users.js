const postgreDB = require("../config/postgre");
const bcrypt = require("bcrypt");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "select * from users";
    postgreDB.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createUsers = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into users(email,password,phone_number) values($1,$2,$3) returning id,email,created_at";
    const { email, password, ["phone_number"]: phoneNumber } = body;

    bcrypt.hash(password, 15, (err, hash) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      postgreDB.query(query, [email, hash, phoneNumber], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(result);
      });
    });
  });
};

const editPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { old_password, new_password, users_id } = body;
    const getPwdQuery = "select password from users where id = $1";
    getPwdValues = [users_id];
    postgreDB.query(getPwdQuery, getPwdValues, (err, response) => {
      if (err) {
        console.log(err);
        return reject({ err });
      }
      const hashedPwd = response.rows[0].password;
      bcrypt.compare(old_password, hashedPwd, (err, isSame) => {
        if (err) {
          console.log(err);
          return reject({ err });
        }
        if (!isSame) {
          return reject({
            err: new Error("old password is wrong"),
            statusCode: 401,
          });
        }
        bcrypt.hash(new_password, 15, (err, newHash) => {
          if (err) {
            console.log(err);
            return reject({ err });
          }
          const query = "update users set password = $1 where id = $2";
          const values = [newHash, users_id];
          postgreDB.query(query, values, (err, Queryresult) => {
            if (err) {
              console.log(err);
              return reject({ err });
            }
            return resolve(Queryresult);
          });
        });
      });
    });
  });
};

// const editUsers = (body, params) => {
//   return new Promise((resolve, reject) => {
//     let query = "update users set ";
//     const values = [];

//     Object.keys(req.body).forEach((key, idx, array) => {
//       if (idx === array.length - 1) {
//         query += `${key} = $${idx + 1} where id = $${idx + 2}`;
//         values.push(body[key], params.id);
//         return;
//       }
//       query += `${key} = $${idx + 1},`;
//       values.push(body[key]);
//     });
//     // res.json({
//     //   query,
//     //   values,
//     // });
//     postgreDB
//       .query(query, values)
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((err) => {
//         console.log(err);
//         reject(err);
//       });
//   });
// };

const dropUsers = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from users where id = $1";
    postgreDB.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getId = (params) => {
  return new Promise((resolve, reject) => {
    const query = "select email,phone_number from users where id = $1";
    postgreDB.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};
const usersRepo = {
  getAllUsers,
  createUsers,
  //editUsers,
  dropUsers,
  editPassword,
  getId,
};

module.exports = usersRepo;
