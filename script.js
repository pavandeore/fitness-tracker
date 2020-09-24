import Data from './data.js';

let submit = document.querySelector('.submit');
let display = document.querySelector('.display');
let get = document.querySelector('.get-data');
let role = document.querySelector('.role-btn');


let displayDiv = document.querySelector('.display-div');
let trackDiv = document.querySelector('.track-div > div');


function formula(height,weight,age){
    return ((weight*703)/height**2).toFixed(2)
}

function addEntry(){
    
    let userid = document.querySelector('.id').value;
    let username = document.querySelector('.name').value;
    let userheight = document.querySelector('.height').value;
    let userweight = document.querySelector('.weight').value;
    let userage = document.querySelector('.age').value;

    const dataObj = {
        id: userid,
        name: username,
        height: userheight,
        weight: userweight,
        age: userage
    }
    
    Data.push(dataObj)

}

function displayData(){
   
    displayDiv.innerHTML = "<h2>Available Data</h2>";
    Data.forEach((entry)=>{
        let p = document.createElement('p');
        p.innerHTML = ` <p> Id: ${entry.id} <br/> Name: ${entry.name} <br/> Age: ${entry.age} <br/> Height: ${entry.height} <br/> weight: ${entry.weight} </p>`;
        displayDiv.appendChild(p);
    })
}

function getData(){
    let searchId = document.querySelector('.search-id').value;
    let dietPlanDiv = document.querySelector('.diet-plan-div');
    let innerDiv = document.createElement('div');
    
    Data.forEach((entry)=>{
        if(entry.id == searchId){
             
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
                 status = 'Normal - No Diet Plan Required!';
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

             innerDiv.innerHTML = `<p>ID - ${entry.id}</p> <p>NAME - ${entry.name}</p> <p>BMI - ${bmi}</p><p>Status - ${status}</p>`;
             trackDiv.appendChild(innerDiv);
             
        }
    })
    
}

function roleHandle(){

    let trainer = document.querySelector('.trainer');
    let member = document.querySelector('.member');

    let mainDiv = document.querySelector('.main');

    console.log('test')
    if(member.checked){
        mainDiv.style.display = "none";
    }
    if(trainer.checked){
        mainDiv.style.display = "flex";
    }
}

role.addEventListener('click',roleHandle);
submit.addEventListener('click',addEntry);
display.addEventListener('click',displayData);
get.addEventListener('click',getData);