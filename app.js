const express       = require('express'),
        app         = express(),
        axios       = require('axios');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());


app.get('/', (req, res, next) => {
    res.render('home')
});

// Display the second html page
app.get('/predict', (req, res, next) => {
    res.render('predict')
})

app.post('/predict', (req, res, next) => {
    const { product, calories, carbs, time, dish, heat, fat, no_ingredients, proteins, proteins_class, cuisine } = req.body;


    const items = {
        product: product, 
        calories: +calories, 
        carbs: +carbs, 
        time: time, 
        dish: dish, 
        heat: heat, 
        fat: +fat, 
        no_ingredients: +no_ingredients, 
        proteins: +proteins, 
        proteins_class: proteins_class, 
        cuisine: cuisine
    };


    axios.post('https://restaurant-api-sales.herokuapp.com/predict',JSON.stringify(items), {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            // "Content-Disposition": "form-data"
        }
    })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
})

app.listen(3000,()=>console.log("Server is hot @ 3000"))

module.exports = app;