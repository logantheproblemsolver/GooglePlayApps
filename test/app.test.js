const expect = require('chai').expect;
const app = require('../app');
const supertest = require('supertest');


describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.leas(1)
                const apps = res.body[0];
                expect(apps).to.include.all.keys(
                    'App', 'Rating', 'Genres'
                )
            });
    });
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be by ratings or apps')
            .then(res => {
                expect(res.body).to.be.an('object');
                let sorted = true;
                let i = 0;
                while(i < res.body.length -1) {
                    const appsAtI = res.body[i];
                    const appsAtIPlus1 = res.body[i + 1];
                    if(appsAtIPlus1.ratings < appsAtI.ratings) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })

    })
})




