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
           alert("High Sales")
       }else{
           alert("Low Sales")
       }
       predictBtn.innerHTML = "Predict";
    predictBtn.disabled = false;
    document.getElementById("product").value = "family"
     } catch (error) {
         console.log(error)
         console.log("something broke")
     }
            
})


    

// {product:"stri","calories":5.0,"carbs":500,"time":"string","dish":"string","heat":"string","fat":0,"no_ingredients":500,"proteins":20,"protein_class":"string","cuisine":"string"}