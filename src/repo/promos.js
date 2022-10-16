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

const createPromos = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into promos(promos_name,product_id,diskon,min_order,max_price,start_promos,end_promos,detail) values ($1,$2,$3,$4,$5,$6,$7,$8)";
    const {
      ["promos_name"]: promosName,
      ["Product_id"]: productId,
      diskon,
      ["min_order"]: minOrder,
      ["max_price"]: maxPrice,
      ["start_promos"]: startPromos,
      ["end_promos"]: endPromos,
      detail,
    } = body;
    postgreDB.query(
      query,
      [
        promosName,
        productId,
        diskon,
        minOrder,
        maxPrice,
        startPromos,
        endPromos,
        detail,
      ],
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
        query += `${key} = $${idx + 1} where promos_id = $${idx + 2}`;
        values.push(body[key], params.promos_id);
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
    const query = "select * from promos where lower(name) LIKE upper($1) ";
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
