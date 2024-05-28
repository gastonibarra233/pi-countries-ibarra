const { Country } = require('../db')
const axios = require('axios')
require('dotenv').config()
const { URL_API } = process.env

//get countries from API
const apiData = async () => {
    try {
        const { data } = await axios.get(`${URL_API}`)
        const countries = await data.map(country => {
            return {
                id: country.cca3,
                name: country.name.common,
                flagImg: country.flags.svg,
                continent: country.continents ? country.continents[0] : 'undefined',
                capital: country.capital ? country.capital.join(', ') : 'undefined',
                subregion: country.subregion ? country.subregion : 'undefined',
                area: country.area ? country.area : 'undefined',
                population: country.population ? country.population : 'undefined',
            }
        })
        return countries;
    } catch (error) {
        console.log('Error getting API data', error)
    }
}

// load API data into my DB
const apiToDB = async () => {
    try {
        const database = await Country.findAll()

        if (database.length < 1) {
            const allCountries = await apiData();
            await Country.bulkCreate(allCountries)
        }
    } catch (error) {
        console.log('Error loading API data into my database', error)
    }
}

module.exports = apiToDB;