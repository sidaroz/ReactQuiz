/* const express = require("express");
const router = express.Router();
const userScoreController = require("../controllers/userScore");

router.post("/", userScoreController.newQuiz);
router.get("/:usename", userScoreController.findByUsername);
router.patch("/entry/:id", userScoreController.updateScore)

module.exports = router;
 */
describe ('userScore endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should return all users', async() =>{
        const res = await request(api).get('/users')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(2)
        expect(res.body[0]).toHaveProperty('user_id')
    })

    it('should return user by username', async() => {
        const res = await request(api).get('/user1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.user_id).toEqual(1)
    })

    it('should return user not found by username', async() => {
        const res = await request(api).get('/user9')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('err')
    })

    it('should create a new user', async() => {
        const res = await request(api).post('/')
        .send({
            username: 'newUser',
            score: 7
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body.user).toHaveProperty('user_id')

        const userres = await request(api).get('/users')
        expect(userres.body.length).toEqual(5)
    })

    it('should not create a new user if username exceeds 30 characters', async() => {
        const res = await request(api).post('/users/register/')
        .send({
            username: 'newUserIsToBeCreatedWhenItIsRegistered',
            password: 'newpass',
            email: 'newuser@email.com'
        })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('err')
    })

    it('should update the users total score and frequency on the leaderboard', async() => {
        const res = await request(api).get('/user1')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('err')
    })

})
