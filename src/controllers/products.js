const { query } = require("express");
const { Query } = require("pg");
const productsRepo = require("../repo/products");

const getAll = async (req, res) => {
  try {
    const response = await productsRepo.getAllProducts();
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const create = async (req, res) => {
  try {
    const response = await productsRepo.createProducts(req.body, req.file.path);
    res.status(201).json({
      result: "menambahkan product sukses",
    });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const edit = async (req, res) => {
  try {
    const response = await productsRepo.editProducts(req.body, req.params);
    res.status(200).json({ result: "edit product success" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const response = await productsRepo.dropProducts(req.params);
    res.status(200).json({ result: "delete product success" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const getCategory = async (req, res) => {
  try {
    const response = await productsRepo.getCategoryProducts(req.params);
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const getSearch = async (req, res) => {
  try {
    const response = await productsRepo.getSearch(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const getSort = async (req, res) => {
  try {
    console.log(req.query);
    const response = await productsRepo.getSort(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const transactionController = {
  getAll,
  create,
  edit,
  drop,
  getCategory,
  getSearch,
  getSort,
};

module.exports = transactionController;
