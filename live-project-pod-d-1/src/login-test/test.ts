import app from "../app";
import supertest from "supertest";
import db from "../config/database.config";

const request = supertest(app)

beforeAll(async() => {
  await db.sync({ force: true }).then(() => {
    console.log("Database connected successfully for test")
  }).catch(err => {
    console.log(`${err}`)
  })
})

describe('Testing Users api', () => {
  it('register user test', async () => {
    const response = await request.post('/users/create').send({
       "firstname": "Moses",
      "lastname": "christoph",
      "username": "moses123",
      "email": "moses@gmail.com",
      "phonenumber": "07066848884",
      "password": "12345678",
      "confirmpassword": "12345678"
    })

    // expect(response.status).toBe(201);
    expect(response.body.message).toBe('user created successfully')
    expect(response.body).toHaveProperty('record')

  })

 it("should login a user test", async () => {
       const response = await request.post('/users/login').send({
       "email": "moses@gmail.com",
       "password": "12345678",
     })
   })

})
