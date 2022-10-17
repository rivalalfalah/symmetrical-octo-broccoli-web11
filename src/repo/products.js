const { Query } = require("pg");
const postgreDB = require("../config/postgre");
const products = require("../routes/products");

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select products.name,category.name_category ,sizes.size,products.price ,products.image ,products.stock,products.description from ((products inner join category on products.category_id = category.id)inner join sizes on products.size_id = sizes.id)";
    postgreDB.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createProducts = (body, file) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products(name,category_id,size_id,price,image,stock,description) values ($1,$2,$3,$4,$5,$6,$7)";
    const { name, category_id, size_id, price, stock, description } = body;
    const { image } = file;
    postgreDB.query(
      query,
      [name, category_id, size_id, price, image, stock, description],
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

const editProducts = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update products set ";
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

const dropProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where id = $1";
    postgreDB.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getCategoryProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "select * from products where category_id = $1";
    postgreDB.query(query, [params.category_id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getSearch = (params) => {
  return new Promise((resolve, reject) => {
    const query = "select * from products where lower(name) LIKE lower($1) ";
    const { name } = params;
    postgreDB.query(query, [`%${name}%`], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getSort = (params) => {
  return new Promise((resolve, reject) => {
    const query = "select * from products order by id ";
    const { sort } = params;
    if (sort == `asc`) {
      query += `asc`;
    }
    if (sort == `desc`) {
      query += `desc`;
    }
    postgreDB.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getProductsPagination = (queryParams) => {
  return new Promise((resolve, reject) => {
    // const bookSchema = {
    //   table: "books",
    //   alias: "b",
    //   column: {
    //     id: "number",
    //     title: "string",
    //     author: "string",
    //     publisher: "string",
    //     genre: "string",
    //     published_date: "date",
    //   },
    // };
    // asumsi query params selalu berisi title dan author
    let query = "select name, price,image,description from products p ";
    const values = [];
    const whereParams = Object.keys(queryParams).filter((key) =>
      ["name"].includes(key)
    );
    if (whereParams.length > 0) query += "where ";
    whereParams.forEach((key) => {
      if (values.length > 0) query += "and ";
      query += `lower(p.${key}) like lower('%' || $${
        values.length + 1
      } || '%') `;
      values.push(String(queryParams[key]));
    });
    console.log(values);
    // paginasi biasanya diwakili dengan query page dan limit
    const page = Number(queryParams.page);
    const limit = Number(queryParams.limit);
    const offset = (page - 1) * limit;
    query += `limit $${values.length + 1} offset $${values.length + 2}`;
    values.push(limit, offset);
    postgreDB.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const productsRepo = {
  getAllProducts,
  createProducts,
  editProducts,
  dropProducts,
  getCategoryProducts,
  getSearch,
  getSort,
  getProductsPagination,
};

module.exports = productsRepo;
