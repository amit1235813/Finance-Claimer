const request = require('supertest');
const {User} = require('../models/users');

let server;

describe('/api/users', () => {
    beforeEach(() => { server = require('../index'); })
    afterEach(async () => { 
        server.close(); 
        //await Genre.remove({});
      });

    describe('GET /', () => {  
        it('should return all users', async () => {
            const res = await request(server).get('/api/users');
            expect(res.status).toBe(200);
        });
    });
});