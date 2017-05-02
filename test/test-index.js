const app = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
chai.use(chaiHttp);


describe('Movie app', function() {
    it('Should return status of 200 on homepage', function() {
        return chai.request(server)
            .get('/')
            .then(function(res) {
                res.should.have.status(200);
            });
    });
    it('Should return status of 200 on user login', function() {
        return chai.request(server)
            .get('/users/login')
            .then(function(res) {
                res.should.have.status(200);
            });
    });
    it('Should return status of 200 on registration', function() {
        return chai.request(server)
            .get('/users/register')
            .then(function(res) {
                res.should.have.status(200);
            });
    });

});