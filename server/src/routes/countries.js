const { Router } = require("express");
const apiToDB = require("../controllers/getCountries");
const getDBinfo = require("../controllers/getDBinfo");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  await apiToDB();
  const DBinfo = await getDBinfo();

  try {
    if (!name) {
      return res.status(200).json(DBinfo);
    } else {
      const filteredCountry = DBinfo.filter((element) =>
        element.name.toLowerCase().includes(name.toLowerCase())
      );

      return res.status(200).json(filteredCountry);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.get("/:idPais", async (req, res) => {
  const { idPais } = req.params;
  const allCountry = await getDBinfo();

  try {
    if (idPais) {
      const idFound = await allCountry.find((country) => country.id === idPais);

      if (!idFound) return res.status(400).send("ID has not found");

      return res.status(200).json(idFound);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
