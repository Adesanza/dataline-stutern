let predictModal = new bootstrap.Modal(document.getElementById('predictModal'), {
    keyboard: false
  })
let modalBody = document.getElementById("modalBody");
// predictModal.show();
const form = document.querySelector('#myForm');
const predictBtn = document.getElementById("predict");
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    predictBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...`
    predictBtn.disabled = true;
    const product = document.getElementById('product').value;
    const heat = document.getElementById('heat').value;
    const cooking_time = document.getElementById('cooking').value;
    const dish = document.getElementById('dish').value;
    const protein_class = document.getElementById('protein-class').value;
    const cuisine = document.getElementById('cuisine').value;
    const calories = document.getElementById('calories').value;
    const carbs = document.getElementById('carbs').value;
    const fat = document.getElementById('fat').value;
    const ingredients = document.getElementById('ingredients').value;
    const protein = document.getElementById('protein').value;
    

    // console.log(e)

    const items = {
        product, 
        calories, 
        carbs, 
        time: cooking_time, 
        dish, 
        heat, 
        fat, 
        no_ingredients: ingredients, 
        proteins: protein, 
        protein_class, 
        cuisine
    };
     try {
        const result = await fetch('http://localhost:3000/submit', {
            headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
            },
            method: "POST", 
            body: JSON.stringify(items),
           //  mode: "no-cors"
   
        })
        const data = await result.json();
        console.log(data)
        if(data.pred > 500){
            modalBody.innerHTML = `<center>
            <p class="results">Results</p>
            <img src="https://res.cloudinary.com/adesanza/image/upload/v1612962679/Group_150_fifybp.svg" alt="" height="200px" width="300px">
            <p class="increased">Increased sales Predicted</p>
            <p class="recommend">Recommendations</p>
            <p class="stock"><span class="iconify" data-icon="teenyicons:tick-circle-solid" data-inline="false"></span> Stock up on low inventories for the week</p>
            <p class="stock"><span class="iconify" data-icon="teenyicons:tick-circle-solid" data-inline="false"></span> Increase Staff engagement</p>
            <div>
                <button type="button" class="btn text-center go-back" data-dismiss="modal">Go Back</button>
            </div>
        </center>`
            predictModal.show();
       }else{
             modalBody.innerHTML =`<center>
             <p class="results">Results</p>
             <img src="https://res.cloudinary.com/adesanza/image/upload/v1612962740/low_sales_zmrpyz.svg" alt="" height="200px" width="300px">
             <p class="increased text-danger">Low Sales Predicted!</p>
             <p class="recommend">Recommendations</p>
             <p class="stock text-danger"><span class="iconify" data-icon="teenyicons:tick-circle-solid" data-inline="false"></span> No need to stock up for the week</p>
             <p class="stock text-danger"><span class="iconify" data-icon="teenyicons:tick-circle-solid" data-inline="false"></span> Decrease staff engagement</p>
             <div>
                 <button type="button" class="btn text-center go-back" data-dismiss="modal">Go Back</button>
             </div>
         </center>`
            predictModal.show();
       }
       predictBtn.innerHTML = "Predict";
    predictBtn.disabled = false;
    document.getElementById('product').value = "2 person"
    document.getElementById('heat').value = "optional_heat"
    document.getElementById('cooking').value = "time_level_4"
    document.getElementById('dish').value = "veggie"
    document.getElementById('protein-class').value = "fish"
    document.getElementById('cuisine').value = "Asian"
    document.getElementById('calories').value = ""
    document.getElementById('carbs').value = ""
    document.getElementById('fat').value = ""
    document.getElementById('ingredients').value = ""
    document.getElementById('protein').value = "";
     } catch (error) {
         console.log(error)
         console.log("something broke")
     }
            
})


    

// {product:"stri","calories":5.0,"carbs":500,"time":"string","dish":"string","heat":"string","fat":0,"no_ingredients":500,"proteins":20,"protein_class":"string","cuisine":"string"}