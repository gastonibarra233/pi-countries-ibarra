const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagImg: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      charset: 'utf8', //it indicates the set of characters used to encode the character string in te database, UTF-8 --> a wide range of characters from differente languages. (countries with peculiar capital names)
      collate: 'utf8_general_ci' // ci case-insensitive, allows queries and string comparisons to be case-insensitive, ignoring differences in capitalization.
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.STRING
    },
    population: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
    timestamps: false
  });
};