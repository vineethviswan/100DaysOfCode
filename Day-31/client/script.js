
fetch('http://localhost:5000/secret')
    .then((res) => res.json())
    .then((data) => console.log(data)) 
