const postgreDB = require("../config/postgre");

const getAllPromos = () => {
  return new Promise((resolve, reject) => {
    const query = "select * from promos";
    postgreDB.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createPromos = (body, file) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into promos(name,products_id,diskon,start,finished,image,detail) values ($1,$2,$3,$4,$5,$6,$7)";
    const { name, products_id, diskon, start, finished, detail } = body;
    //const { image } = file;
    postgreDB.query(
      query,
      [name, products_id, diskon, start, finished, file, detail],
      (err, queryResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(queryResult);
      }
    );
  });
};

const editPromos = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update promos set ";
    const values = [];
    Object.keys(req.body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id = $${idx + 2}`;
        values.push(body[key], params.id);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    // res.json({
    //   query,
    //   values,
    // });
    postgreDB
      .query(query, values)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const dropPromos = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from product where id = $1";
    postgreDB.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getSearch = (params) => {
  return new Promise((resolve, reject) => {
    const query =
      "select promos.name,products.name,promos.diskon,promos.start,promos.finished,promos.image,promos.detail from promos inner join products on promos.products_id = products.id where lower(promos.name) LIKE upper($1) ";
    const { name } = params;
    postgreDB.query(query, [`%$${name}%`], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const promosRepo = {
  getAllPromos,
  createPromos,
  editPromos,
  dropPromos,
  getSearch,
};

module.exports = promosRepo;
