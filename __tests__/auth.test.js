const request = require('supertest');
const { app, prisma } = require('../app'); 

jest.mock('../services/mailsender', () => ({
  sendmail: jest.fn().mockResolvedValue(true),
}));

let token ;
let digimonid ;
let userid;


  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { username: 'testuser' },
    });
  });

describe('Auth API', () => {
  const agent = request.agent(app);

  //----------register user + verify-------//
  it('should register a new user', async () => {
    const response = await request(app).post('/register').send({
        username: 'testuser',
        password: '123456',
        email: 'test@test.com',
      });

    expect(response.statusCode).toBe(200);
    token = response.body.token;
  });

  it('should verify new user',async () => {
    const response = await request(app).get(`/verify/${token}`);
    expect(response.statusCode).toBe(200);
  })
  //--------login--------//
  it('should login to a user', async () => {
     const response = await agent.get('/login').query({
      username: 'testuser',
      password: '123456',
      remamber: 'false',
     })
     expect(response.statusCode).toBe(200);
     userid = response.body.id;
    });

    ///-----reset password + verify ----////
  it ('should reset the user password',async() => {
    const response = await request(app).post('/resetpassword').send({
      email: 'test@test.com',
    })
    expect(response.statusCode).toBe(200);
    token = response.body.token;
  })


  it ('should confirm reset password',async() => {
    const response = await request(app).put('/confirmReset').send({
      password: '12345',
      token: token,
    })
    expect(response.statusCode).toBe(200);
  })
  //-----create and evolve digimon-----///

  it ('should create and add new digimon to user list',async() => {
    const response = await agent.post('/addDigimon').send({
    Photo: 'https://digi-api.com/images/digimon/w/Hawkmon.png',
    Name: 'Hawkmon',
    Rank: 'Rookie',
    Level: '5',   
    Attribute: 'Data',
    Hp: '100',
    Attack: '20',
    Defense: '15',
    userMoney: 500,
    })

     expect(response.statusCode).toBe(200);
       digimonid = response.body.newDigimon.id;
  })

  it('should evolve the digimon',async() => {
    const response = await request(app).put('/evolve').send({
        id: digimonid,
        rank: "Champion",
        hp: 120,
        attack: 80,
        defense: 60,
        evolve: {
          name: "Greymon",
          images: [
            { href: "https://digi-api.com/images/digimon/w/Greymon.png" }
          ],
          attributes: [
            { attribute: "Vaccine" }
          ]
        }
    })
     expect(response.statusCode).toBe(200);
  })
  //-----buy and use item -----///
  it ('buy item and add him to user inventory',async() =>{
    const response = await agent.post('/additem').send({
      itemid: 1,
      userid: userid,
      amount: 1,
      money: 100,
    })
       expect(response.statusCode).toBe(200);
  })
  it('use item on digimon',async() => {
    const response = await request(app).put('/useitem').send({
    itemid: 1,
    userid: userid,
    digimonid: digimonid,
    stat: 'hp',
    })
     expect(response.statusCode).toBe(200);
  })
  //-----delete digimon-----//
  it('should delete the digimon',async() => {
    const response = await request(app).delete('/deleteDigimon').send({
      id:digimonid
    })
    expect(response.statusCode).toBe(200);
  })
});