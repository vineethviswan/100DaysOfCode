
/*------------------------------------------------------------------------
    Day 21 - Promises in Nodejs
             Understand and use promises for asynchronous operations
-------------------------------------------------------------------------*/

console.log('Promises in Nodejs!');

function fetchData() {
    return fetch("http://localhost:3000")
        .then((response) => response.json())
        .catch((error) => {
            throw new Error("Error fetching data : ", error.message);
        });
}

const aPromise = new Promise((resolve, reject) => {

    //Asynchronous operation
    const data = fetchData();
    if(data){
        resolve(data);
    } else {
        reject('Error: No data found');
    }
});

aPromise
    .then((result) => { 
        console.log('Promise fulfilled with result : ', result);
     })
    .catch((error) => {
        console.log('Promise rejected with error : ', error);
    });
