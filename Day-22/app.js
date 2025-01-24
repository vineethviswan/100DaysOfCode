
/*------------------------------------------------------------------------
    Day 22 - Async/Await in Nodejs
             Use async/await syntax for asynchronous programming
-------------------------------------------------------------------------*/

console.log('Async/Await in Nodejs!');

async function fetchData() {
    let response = await fetch("http://localhost:3000");
    if(response.ok){
        let data = await response.json();
        return data;
    } else {
        throw new Error("Error fetching data :", response.statusText);
    }
}

async function fetchAndPrintData() {
    try {
        let data = await fetchData();
        console.log('Data fetched : ', data);
    } catch (error) {
        console.log('Error fetching data : ', error);
    }
}

fetchAndPrintData();