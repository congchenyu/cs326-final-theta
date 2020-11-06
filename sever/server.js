var express = require('express');
var app = express();
var path = require('path');
var faker = require('faker');


app.use(express.static('public'))
app.use(express.json())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/main.html'));
});


app.get('/api/products', (req, res) => {
    let products = [];
    for (let i = 0; i < 6; i++) {
        products.push({
            id: i,
            img: faker.image.imageUrl(),
            name: faker.commerce.productName(),
            price: faker.commerce.price()
        })
    }
    res.send({ code: 0, data: products });
})

app.post('/api/signin', (req, res) => {
    let auth = req.body;
    res.send({ code: 0, success: true, user: auth });
})


app.post('/api/signup', (req, res) => {
    let auth = req.body;
    res.send({ code: 0, success: true, user: auth });
})


app.get('/api/product/:id', (req, res) => {
    let product = {
        id: req.params.id,
        img: faker.image.imageUrl(),
        name: faker.commerce.productName(),
        detail: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        phone: faker.phone.phoneNumber(),
        status: "New",
        address: faker.address.streetAddress() + " " + faker.address.city() + " " + faker.address.country()
    }
    res.send({ code: 0, data: product });
})

app.put('/api/product/:id', (req, res) => {
    let product = req.body
    res.send({ code: 0, success: true, data: product });
})


app.post('/api/product', (req, res) => {
    let product = req.body;
    res.send({ code: 0, success: true, data: product });
})



app.post('/api/buy/:id', (req, res) => {
    res.send({ code: 0, success: true });
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, (req, res) => {
    console.log("Server is running successfullly!")
})