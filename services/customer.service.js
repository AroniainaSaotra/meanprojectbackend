const bcrypt = require("bcryptjs");
const Customer = require("../models/backOffice/utilisateurModel");
const jwt = require("jsonwebtoken");

async function signUpCustomer(customerData) {
  try {
    // Vérifier si le mot de passe est défini et est une chaîne de caractères
    if (!customerData.mdp || typeof customerData.mdp !== "string") {
      throw new Error("mdp is required and must be a string");
    }

    console.log("Customer mdp before hashing:", customerData.mdp);

    // Hasher le mot de passe
    const hashedmdp = await bcrypt.hash(customerData.mdp, 10);

    console.log("Hashed mdp:", hashedmdp);

    // Créer un nouveau client
    const newCustomer = new Customer({
      name: customerData.name,
      sexe: customerData.sexe,
      mail: customerData.mail,
      mdp: hashedmdp,
    });

    // Sauvegarder le nouveau client dans la base de données
    await newCustomer.save();

    console.log("Customer created successfully");

    return { message: "Customer created successfully" };
  } catch (error) {
    throw error;
  }
}
async function loginCustomer(loginData) {
  try {
    // Vérifiez si l'mail et le mot de passe sont définis
    if (
      !loginData.mail ||
      typeof loginData.mail !== "string" ||
      !loginData.mdp ||
      typeof loginData.mdp !== "string"
    ) {
      throw new Error("mail and mdp are required and must be strings");
    }

    // Vérifiez si l'utilisateur existe
    const customer = await Customer.findOne({ mail: loginData.mail });
    if (!customer) {
      throw new Error("No user found with this mail");
    }

    // Vérifiez le mot de passe
    const isMatch = await bcrypt.compare(loginData.mdp, customer.mdp);
    if (!isMatch) {
      throw new Error("Incorrect mdp");
    }

    // Créez un token JWT
    const token = jwt.sign({ id: customer._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    console.log("User logged in successfully");
    // Decode the token to extract user ID
    const decodedToken = jwt.verify(token, "your-secret-key");
    const userId = decodedToken.id;

    return { message: "User logged in successfully", token, userId };
  } catch (error) {
    throw error;
  }
}
module.exports = {
  signUpCustomer,
  loginCustomer,
};
