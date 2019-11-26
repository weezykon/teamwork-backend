/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;
// const request = require('supertest');
// const assert = require('assert');


chai.use(chaiHttp);
chai.should();

// auth super user

describe('Admin tests', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');
  });

  it('Returns 404 error for non defined routes', (done) => {
    chai.request(app).get('/unexisting').then((res) => {
      expect(res).to.have.status(404);
      done();
    });
  });

  it('should return error 401 for invalid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: '',
        password: '',
      })
      .end((_err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('should return 200 and token for valid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Weezykon@gmail.com',
        password: 'password',
      })
      .end((_err, res) => {
        res.should.have.status(200);
        expect(res.body.user.id).to.exist;
        expect(res.body.token).to.exist;
        expect(res.body.user.password).to.not.exist;
        expect(res.body.message).to.be.equal('Logged in sucessfully.');
      });
    done();
  });

  it('should return error 401 if no valid token provided', (done) => {
    // sed request with no token
    chai.request(app).get('/api/v1/users')
      .set('Authorization', '')
      .then((res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('Access Denied');
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  it('should return 200 if valid token provided', (done) => {
    // mock login to get token
    const validInput = {
      email: 'Weezykon@gmail.com',
      password: 'password',
    };
    // send login request to the app to receive token
    chai.request(app).post('/api/v1/auth/login')
      .send(validInput)
      .then((loginResponse) => {
        // add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
        const token = `Bearer ${loginResponse.body.token}`;
        chai.request(app).get('/api/v1/users')
          .set('Authorization', token)
          .then((res) => {
            // assertions
            expect(res).to.have.status(200);
            expect(res.body.data).to.exist;
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});
