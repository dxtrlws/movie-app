const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const faker = require('faker');
const { app, runServer, closeServer } = require('../server');
chai.use(chaiHttp);
const expect = require('chai').expect;
const request = require('supertest');


describe('Movie app', function() {
    before(function() {
        return runServer();
    });
    after(function() {
        return closeServer();
    });
    it('Should return status of 200 on homepage', function() {
        return chai.request(app)
            .get('/')
            .then(function(res) {
                res.should.have.status(200);
            });
    });
    it('Should return status of 200 on user login', function() {
        return chai.request(app)
            .get('/users/login')
            .then(function(res) {
                res.should.have.status(200);
            });
    });
    it('Should return status of 200 on registration', function() {
        return chai.request(app)
            .get('/users/register')
            .then(function(res) {
                res.should.have.status(200);
            });
    });
    it('should return to the homepage if not logged in', function() {
        return chai.request(app)
            .get('/mymovies')
            .then(function(res){
                res.should.have.status(200);
            });
    });
});