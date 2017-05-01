const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
chai.use(chaiHttp);


describe('Movie app', function() {
    it('Should return status of 200 on GET', function() {
        return chai.request(server)
            .get('/users/login')
            .then(function(res) {
                res.should.have.status(200);
            });
    });
});