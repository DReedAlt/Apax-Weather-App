process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(), 
    sinon = require('sinon'),
    axios = require('axios'),
    app = require('../index.js'),
    User = require('../db/models/User.js');
chai.use(chaiHttp);

describe('api routes', () => {
    let axiosStub,
        UserStub;
    beforeEach(() => {
        UserStub = sinon.stub(User, 'findById').callsFake(() => {
            return {
                savedLocations: ['location', 'location2'],
                save: () => {}
            };
        });
    });
    describe('POST /locationCurrentWeather', () => {
        it ('should return a data object', (done) => {
            axiosStub = sinon.stub(axios, 'get').callsFake(() => {
                return {
                    data: {testStuff: 'test'}
                };
            });
            chai.request(app)
                .post('/api/locationCurrentWeather')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.haveOwnProperty('testStuff');
                    done();
                }); 
        });
        it('should return a status of 500 if owm api call errors', (done) => {
            axiosStub = sinon.stub(axios, 'get').callsFake(() => {
                throw new Error('api call fails');
            });
            chai.request(app)
                .post('/api/locationCurrentWeather')
                .send({
                    zipCode: '00000',
                    countryCode: 'us'
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                }); 
        });
        afterEach(() => {
            axiosStub.restore();
        });
    });
    describe('GET /savedLocations', () => {
        it('finds a user a returns their saved locations', (done) => {
            axiosStub = sinon.stub(axios, 'get').callsFake(() => {
                return {
                    data: {testStuff: 'test'}
                };
            });
            chai.request(app)
                .get('/api/savedLocations')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                });
        });
        after(() => {
            axiosStub.restore();
        });
    });
    describe('POST /saveLocation', () => {
        it('saves a location for a user successfully', (done) => {
            chai.request(app)
                .post('/api/saveLocation')
                .send({
                    zipCode: '00000',
                    countryCode: 'us'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.eql('location saved!');
                    done();
                });
        });
    });
    afterEach(() => {
        UserStub.restore();
    });
});