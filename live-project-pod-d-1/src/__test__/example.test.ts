import 'dotenv/config';
import app from '../app';
import supertest from 'supertest';
import db from '../config/database.config';

const request = supertest(app);
// jest.setTimeout(100000);
beforeAll(async () => {
  await db.sync({ force: true }).then(() => {
    // eslint-disable-next-line no-console
    console.log('database connected is tested');
  });
});

describe('our user apis are tested', () => {
  it('should check if verification email is sent', async () => {
    const response = await request.post('/users/forgotpassword').send({
      email: 'john@gmail.com',
    });
    expect(response.status).toBe(200);
  });

  it('should reset user password', async () => {
    const response = await request.post('/users/login').send({
      username: 'johnd',
      password: '12345678',
    });

    const { id } = response.body.User;
    const response2 = await request.patch(`/users/reset-password/${id}`).send({
      password: '123456789',
      confirmpassword: '123456789',
    });

    expect(response2.status).toBe(200);
  });
});
