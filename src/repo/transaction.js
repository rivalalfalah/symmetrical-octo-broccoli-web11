const postgreDB = require("../config/postgre");

const getAlltransaction = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select users_id,product_id,quantity,promos_id,delivery_adress,payment_method,tax,shipping,total from transactions";
    postgreDB.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createTransaction = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into transactions(users_id,product_id,quantity,promos_id,delivery_adress,payment_method,tax,shipping,total) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
    const {
      ["users_id"]: usersId,
      ["product_id"]: productId,
      quantity,
      ["promos_id"]: promosId,
      ["delivery_adress"]: deliveryadress,
      ["payment_method"]: paymentMethod,
      tax,
      shipping,
      total,
    } = body;
    postgreDB.query(
      query,
      [
        usersId,
        productId,
        quantity,
        promosId,
        deliveryadress,
        paymentMethod,
        tax,
        shipping,
        total,
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

const editTransaction = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update transactions set ";
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

const dropTransaction = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from Transactions where id = $1";
    postgreDB.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getIdTransaction = (params) => {
  return new Promise((resolve, reject) => {
    const query = "select * from Transactions where user_id = $1";
    postgreDB.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const transactionRepo = {
  getAlltransaction,
  createTransaction,
  editTransaction,
  dropTransaction,
  getIdTransaction,
};

module.exports = transactionRepo;
