const { authServices } = require("../services");

const register = async (req, res) => {
  try {
    const result = await authServices.register(req.body);
    res.status(201).json({messege: "create user success ",result})
  } catch(err) {
    res.status(err.status).json(err.message)
  }
};

const login = async (req, res) => {
  try {
    const result = await authServices.login(req.body);
    // header('Authorization', `Bearer ${result}`)
    res.status(200).json({
      message: "login succes",
      token: result
  })
  } catch(err) {
    res.status(err.status).json(err.message)
  }
};

module.exports = {register, login}
