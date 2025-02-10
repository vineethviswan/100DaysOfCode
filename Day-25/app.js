/*------------------------------------------------------------------------
    Day 25 - Testing with Mocha and Chai
             Write basic tests using Mocha and Chai
-------------------------------------------------------------------------*/

class Cube {
    
    constructor (length){
        this.length = length;
    }
    getSideLength (){
        return this.length;
    }
    getSurfaceArea (){
        return 6 * Math.pow(this.length, 2);
    }
    getVolume (){
        return Math.pow(this.length, 3);
    }    
}

// var cube = new Cube(5);
// console.log(cube.getSideLength());

export default Cube;