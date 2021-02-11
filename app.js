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
app.use(express.json())


app.get('/', (req, res, next) => {
    res.render('home')
});

// Display the second html page
app.get('/predict', (req, res, next) => {
    res.render('predict')
})




app.post('/submit', async(req, res, next) => {
    // const { product, calories, carbs, time, dish, heat, fat, no_ingredients, proteins, proteins_class, cuisine } = req.body;
    console.log(req.body);

    const items = {
        product: req.body.product,
        calories: Number(req.body.calories),
        carbs: Number(req.body.carbs),
        time: req.body.time,
        dish: req.body.dish,
        heat: req.body.heat,
        fat: Number(req.body.fat),
        no_ingredients: Number(req.body.no_ingredients),
        proteins: Number(req.body.proteins),
        protein_class: req.body.protein_class,
        cuisine: req.body.cuisine

    };
    

    const result = await axios.post('https://restaurant-api-sales.herokuapp.com/predict',JSON.stringify(items), {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    // console.log(result.data)
    res.json(result.data)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Dataline is hot @ ${PORT}`))

module.exports = app;


// {product:"stri","calories":5.0,"carbs":500,"time":"string","dish":"string","heat":"string","fat":0,"no_ingredients":500000,"proteins":20555,"protein_class":"string","cuisine":"string"}