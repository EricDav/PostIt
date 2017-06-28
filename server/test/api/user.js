import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models';

const User = db.PostIts;
describe('Books', () => {
    beforeEach((done) => {
        .remove({}, (err) => {
           done();         
        });     
    });