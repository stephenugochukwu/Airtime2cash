import 'dotenv/config';
import app from '../app';
import supertest from 'supertest';

import db from '../config/database.config';

const request = supertest(app);

beforeAll(async () => {
  await db.sync({ force: true }).then(() => {
    console.log('Database successfully created for test');
  });
});

describe('it should test all apis', () => {
  // Testing for sign up
  it('it should create a user', async () => {
    const response = await request.post('/users/create').send({
    firstname: "Anu",
    lastname: "Oluwa",
    username: "anuO",
    email: "anu@gmail.com",
    phonenumber: "08066874055",
    password: "password",
    confirmpassword: "password"
    });
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe('successfully created a user');
    expect(response.body.status).toBe('success');
    expect(response.body).toHaveProperty('record');
  });
});
