
import { expect } from 'chai';
import Add from '../app.js';

describe('1. Testing Add Functions', function () {
    it ('1. Add two numbers', function (done){
        expect (Add(5, 5)).to.equal(10);
        done();
    });
});
