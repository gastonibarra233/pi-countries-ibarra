const { Activity, Country } = require("../db");

//get DB info
const getDBinfo = async () => {
  try {
    return await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log(
      "Error getting all countries from database including their activities", error
    );
  }
};

module.exports = getDBinfo;
