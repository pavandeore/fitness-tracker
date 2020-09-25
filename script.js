import Data from './data.js';
import Quotes from './quotes.js';


let random = Math.round(Math.random()*Quotes.length);
console.log(random);
let quoteDiv = document.querySelector('.quote');
quoteDiv.innerHTML = `<p>${Quotes[random]}</p>`;


let submit = document.querySelector('.submit');
let get = document.querySelector('.get-data');


let trackDiv = document.querySelector('.track-div');


function formula(height,weight,age){
    return ((weight*703)/height**2).toFixed(2)
}

const firebaseMainData = [];

function addEntry(){
    
    let username = document.querySelector('.name').value;
    let userheight = document.querySelector('.height').value;
    let userweight = document.querySelector('.weight').value;
    let userage = document.querySelector('.age').value;

    const dataObj = {
        name: username,
        height: userheight,
        weight: userweight,
        age: userage
    }
    
    Data.push(dataObj)

    var firebaseRef = firebase.database().ref('Data');

    firebaseRef.set(Data)
    setTimeout(alert('success'),2000)
}


function getData(){
    let searchId = document.querySelector('.search-id').value;
    let dietPlanDiv = document.querySelector('.diet-plan-div');
    let innerDiv = document.createElement('div');

    var getDataRef = firebase.database().ref();

    getDataRef.on("value", function(snapshot) {
       const fireData = snapshot.val();
       console.log(fireData.Data);

       fireData.Data.forEach((entry)=>{
         if(entry.name == searchId){
              
              let bmi = formula(entry.height,entry.weight,entry.age);
              let status = null;
              if(bmi<18.5){
                  status = 'Underweight Check Below your diet plan';
                  dietPlanDiv.innerHTML = `
                  <h2>Underweight Diet Plan</h2>
                  <div>
                  <table class="table">
                  <tr>
                     <th>Time</th>
                     <th>Meal</th>
                  </tr>
                  <tr>
                     <td>8 am </td> <td>1 Glass of Milk, 2 Banana</td>
                  </tr>
                  <tr>
                     <td>10 am </td> <td> 4 Boiled Eggs, 2 Brown Bread with Salad</td>
                  </tr>
                  <tr>
                     <td>1 pm </td> <td> 250gm Chicken with 2 chapatis </td>
                  </tr>
                  <tr>
                     <td>4 pm </td> <td> 4 Boiled Eggs, 2 Boiled Potatoes</td>
                  </tr>
                  <tr>
                     <td>8 pm </td> <td> 100gm vege Dinner with 2 chapatis</td>
                  </tr>
                  <tr>
                     <td>10 pm </td> <td> 2 Boiled Eggs </td>
                  </tr>
                  </table>
                  </div>`
              }
              else if(bmi<24.9){ 
                  status = 'Normal - Ideal Diet Plan Required!';
                  dietPlanDiv.innerHTML = `
                  <h2>Ideal Diet Plan</h2>
                  <div>
                  <table class="table">
                  <tr>
                     <th>Time</th>
                     <th>Meal</th>
                  </tr>
                  <tr>
                     <td>8 am </td> <td> 1 Cup Green Tea</td>
                  </tr>
                  <tr>
                     <td>10 am </td> <td> 1 Egg-whites, 1 Cup Oats</td>
                  </tr>
                  <tr>
                     <td>1 pm </td> <td> Normal Meal with 2 chapatis </td>
                  </tr>
                  <tr>
                     <td>4 pm </td> <td> 1 Egg-whites, 1 Cup Oats</td>
                  </tr>
                  <tr>
                     <td>8 pm </td> <td> Normal Meal with 2 chapatis - No Rice</td>
                  </tr>
                  <tr>
                     <td>10 pm </td> <td> 1 Egg-whites </td>
                  </tr>
                  </table>
                  </div>`
              }
              else {
                  status = 'Overweight Check Below your diet plan';
                  dietPlanDiv.innerHTML = `
                  <h2>Overweight Diet Plan</h2>
                  <div>
                  <table class="table">
                  <tr>
                     <th>Time</th>
                     <th>Meal</th>
                  </tr>
                  <tr>
                     <td>8 am </td> <td> 1 Cup Green Tea</td>
                  </tr>
                  <tr>
                     <td>10 am </td> <td> 1 Egg-whites, 1 Cup Oats</td>
                  </tr>
                  <tr>
                     <td>1 pm </td> <td> Normal Meal with 2 chapatis </td>
                  </tr>
                  <tr>
                     <td>4 pm </td> <td> 1 Egg-whites, 1 Cup Oats</td>
                  </tr>
                  <tr>
                     <td>8 pm </td> <td> Normal Meal with 2 chapatis - No Rice</td>
                  </tr>
                  <tr>
                     <td>10 pm </td> <td> 1 Egg-whites </td>
                  </tr>
                  </table>
                  </div>`
              }
              
              innerDiv.innerHTML = `<p>NAME - ${entry.name}</p> <p>BMI - ${bmi}</p> <p>Status - ${status}</p> <hr/>`;
              innerDiv.style.display = "block";
              trackDiv.appendChild(innerDiv);
              
         }

    }, function (error) {
       console.log("Error: " + error.code);
    });
    
    
    })
    
}

submit.addEventListener('click',addEntry);
get.addEventListener('click',getData);