const { Activity } = require("../db");


//create a new activity and associate it with the corresponding country
const postActivity = async (name, difficulty, duration, season, countryId) => {
    try {
        let [activity, created] = await Activity.findOrCreate({
            where: {
                name,
                difficulty,
                duration,
                season,
            }
        })
        await activity.setCountries(countryId)
        return activity
    } catch (error) {
        console.log('Error creating an activity', error)
    }
}

module.exports = postActivity;