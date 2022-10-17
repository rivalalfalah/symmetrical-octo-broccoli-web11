const promosRepo = require("../repo/promos");

const getAll = async (req, res) => {
  try {
    const response = await promosRepo.getAllPromos();
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
    const response = await promosRepo.createPromos(req.body, req.file.path);
    //console.log(req.file.path);
    res.status(201).json({
      result: "promo created",
    });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const edit = async (req, res) => {
  try {
    const response = await promosRepo.editPromos(
      req.body,
      req.params,
      req.file.path
    );
    res.status(200).json({ result: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = (req, res) => {
  try {
    return res.status(500).json({ msg: "internal server error" });
  } catch (error) {
    res.status(200).json({ result });
  }
};

const getSearch = async (req, res) => {
  try {
    const response = await promosRepo.getSearch(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const promosController = {
  getAll,
  create,
  edit,
  drop,
  getSearch,
};

module.exports = promosController;
