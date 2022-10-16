const usersRepo = require("../repo/users");

const getAll = async (req, res) => {
  try {
    const response = await usersRepo.getAllUsers();
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
    const { body } = req;
    const response = await usersRepo.createUsers(body);
    res.status(201).json({
      msg: "user created",
      data: response.rows,
    });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const editPassword = async (req, res) => {
  try {
    const { body } = req;
    const response = await usersRepo.editPassword(body);
    res.status(200).json({ msg: "password has been changed", data: null });
  } catch (objErr) {
    const statusCode = objErr.statusCode || 500;
    res.status(statusCode).json({ msg: objErr.err.message });
  }
};

const drop = async (req, res) => {
  try {
    const response = await usersRepo.dropUsers(req.params);
    res.status(200).json({ result: "user deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const getId = async (req, res) => {
  try {
    const response = await usersRepo.getId(req.params);
    res.status(200).json({
      result: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const usersController = {
  getAll,
  create,
  drop,
  editPassword,
  getId,
};

module.exports = usersController;
