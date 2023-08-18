const indexR = require("./index")
const productsR = require("./products")
const categoriesR = require("./categories")
const usersR = require("./users")



exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/products",productsR);
  app.use("/categories",categoriesR);
  app.use("/users",usersR);
}