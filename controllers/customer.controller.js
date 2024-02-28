const customerService = require("../services/customer.service");

// Fonction pour l'inscription d'un client
async function signUp(req, res) {
  try {
    const result = await customerService.signUpCustomer(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error during customer signup:", error);
    res.status(500).json({ error: "An error occurred during customer signup" });
  }
}
async function login(req, res) {
  try {
    const loginData = req.body;
    const result = await customerService.loginCustomer(loginData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  signUp,
  login,
};
