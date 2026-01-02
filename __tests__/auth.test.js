jest.mock('../services/mailsender', () => ({
  sendmail: jest.fn().mockResolvedValue(true),
}));

const request = require('supertest');
const { app, prisma } = require('../app'); // חשוב: פירוק

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: '123456',
        email: 'test@test.com',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('testuser');
  });
});
