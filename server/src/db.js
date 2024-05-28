require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const countryModelFn = require("./models/Country");
const activityModelFn = require("./models/Activity");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

// run models
countryModelFn(sequelize);
activityModelFn(sequelize);

//relations
const { Country, Activity } = sequelize.models;
Country.belongsToMany(Activity, { through: "Country_Activity" });
Activity.belongsToMany(Country, { through: "Country_Activity" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
