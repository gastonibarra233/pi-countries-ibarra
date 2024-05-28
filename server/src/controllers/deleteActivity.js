const { Activity } = require('../db')

//delete an activity
const deleteActivity = async (name) => {
    try {
        const activity = await Activity.findOne({
            where:
            { name }
        })

        if (!activity) {
            return false
        }
        // console.log(activity)
        //delete the activity of all related countries
        await activity.setCountries([])

        //delete the activity
        await activity.destroy()

        return true;
    } catch (error) {
        console.log('Error deleting activity', error)
        throw error;
    }
}

module.exports = deleteActivity;