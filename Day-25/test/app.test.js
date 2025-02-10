
import { expect } from 'chai';
import Cube from '../app.js';

// const Cube = require('../src/app').Cube;
// const expect = require('chai').expect;
 
describe('1. Testing Cube Functions', function () {

    it ('1. Side length of the Cube', function (done){
        let cube = new Cube(5);
        expect (cube.getSideLength()).to.equal(5);
        done();
    });

    it ('2. Surface Area of the Cube.', function (done){
        let cube = new Cube(5);
        expect (cube.getSurfaceArea() ).to.equal (150)
        //expect (cube.getSurfaceArea() ).to.equal (100) // This will fail
        done();
    });

    it ('3. Volume of the Cube.', function (done){
        let cube = new Cube(5);
        expect (cube.getVolume() ).to.equal (125);
        done();
    });

});



