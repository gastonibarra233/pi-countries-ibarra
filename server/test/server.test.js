const app = require('../src/server')
const session = require('supertest')
const request = session(app)
const { Activity } = require('../src/db')


describe('Test from COUNTRIES ROUTES', () => {
    it('Get all countries as an array', async () => {
        const response = await request.get('/countries')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    it('Get a response with the name searched by query', async () => {
        const response = await request.get('/countries?name=Argentina')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    it('Get a response with an empty array for a non-existent country', async () => {
        const response = await request.get('/countries?name=Nonexistent')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBe(0)
    })

    it('Respond with status 200 and get the country searched by ID', async () => {
        const response = await request.get('/countries/ARG')
        expect(response.status).toBe(200)
    })

    it('Respond with status 400 and the message "ID has not found"', async () => {
        const response = await request.get('/countries/XYZ')
        expect(response.status).toBe(400)
        expect(response.text).toBe("ID has not found")
    })
})


describe('Test from ACTIVITIES ROUTES', () => {
    describe('POST /activities', () => {
        it("It must create a new activity", async () => {
            const activityData = {
                name: 'Hiking',
                difficulty: '2',
                duration: '3',
                season: 'Spring',
                countryId: 'ARG'
            }

            const response = await request.post('/activities').send(activityData)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('id')
            expect(response.body.name).toBe('Hiking')
        })
    })

    describe('GET /activities', () => {
        it("Get all activities as an array", async () => {
            const response = await request.get('/activities')
            expect(response.status).toBe(200)
            expect(Array.isArray(response.body)).toBe(true)
        })
    })

    describe('DELETE /activities', () => {
        it('Delete an activity searching name by query and get status 200', async () => {
            const activity = await Activity.create({
                name: 'Swimming',
                difficulty: '1',
                duration: '2',
                season: 'Summer',
                countryId: 'USA'
            })

            const response = await request.delete(`/activities?name=${activity.name}`)
            expect(response.status).toBe(200)
            expect(response.body.message).toBe("Activity deleted")
        })

        it('Respond with status 404 and the message "Activity not found"', async () => {
            const response = await request.delete('/activities?name=Nonexistent')
            expect(response.status).toBe(404)
            expect(response.body.message).toBe("Activity not found")
        })
    })
})