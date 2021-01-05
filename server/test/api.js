process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET f', () => {
      it('it should GET all the forums', (done) => {
        chai.request(server)
            .get('/f')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.above(0);
                  done();
            });
      });
});

