const transactionRepo = require("../repo/transaction");

const getAll = async (req, res) => {
  try {
    const response = await transactionRepo.getAlltransaction();
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
    const response = await transactionRepo.createTransaction(req.body);
    res.status(201).json({
      result: "transaction success",
    });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const edit = async (req, res) => {
  try {
    const response = await transactionRepo.editTransaction(
      req.body,
      req.params
    );
    res.status(200).json({ result: "transaction edited" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const response = await transactionRepo.dropTransaction(req.params);
    res.status(200).json({ result: "transaction deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const getId = async (req, res) => {
  try {
    const response = await transactionRepo.getIdTransaction(req.params);
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
  getId,
};

module.exports = transactionController;
