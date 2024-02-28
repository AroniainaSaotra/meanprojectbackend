// app.js

const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
require("./dbConnexion");

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

const employeRoute = require("./routes/backOffice/employeRoute");
const managerRoute = require("./routes/backOffice/managerRoute");
const servicesRoute = require("./routes/backOffice/servicesRoute");
const utilisateurRoute = require("./routes/backOffice/utilisateurRoute");
const sous_services = require("./routes/backOffice/sousServicesRoute");
const offre = require("./routes/backOffice/offreRoute");

const customerRoutes = require("./routes/frontoffice/customer.route");
const prestationRoutes = require("./routes/frontoffice/prestation.route");
const cartRoutes = require("./routes/frontoffice/cart.route.js");

app.use("/cart", cartRoutes);
app.use("/customers", customerRoutes);
app.use("/prestations", prestationRoutes);

app.use("/employe", employeRoute);
app.use("/manager", managerRoute);
app.use("/services", servicesRoute);
app.use("/user", utilisateurRoute);
app.use("/sous-services", sous_services);
app.use("/offre",offre);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
