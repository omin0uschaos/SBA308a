import mealInfoDb from './mealInfo.json' assert { type: 'json' };

// console.log(mealInfoDb[52764]);

let searchDiv = document.getElementById("search-div");
let mealList = document.getElementById("meal-list");
let instructionDiv = document.getElementById('instruction-section');
let selectedMealText = document.getElementById('selected-meal-text');
let nutritionInfoText = document.getElementById('nutrition-info');
let priceInfoText = document.getElementById('price-total-text');
let payButton = document.getElementById('pay-button');

// console.log(ingredientList.categories);

async function initialLoad() {
    let ingredientList = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {
            const categoryList = data.categories;
            // Clear placeholder content
            searchDiv.innerHTML = ""; 
            mealList.innerHTML = "";
            selectedMealText.textContent = "";
            nutritionInfoText.textContent = "";
            instructionDiv.textContent = 'Pick an item from the category list.';

            // create img and p element for each category, wrap them in a div, and append to search-div
            for (let i = 0; i < categoryList.length; i++) {
                // Create wrapper div
                let categoryDiv = document.createElement("div");
                categoryDiv.classList.add("category-item"); 

                // Create img element
                let categoryImg = document.createElement("img");
                categoryImg.setAttribute("src", categoryList[i].strCategoryThumb);
                categoryImg.setAttribute("alt", categoryList[i].strCategory);
                
                // Create paragraph element
                let categoryText = document.createElement("p");
                // Set category name as text
                categoryText.textContent = categoryList[i].strCategory; 

                // Add click event listener to the div
                categoryDiv.addEventListener("click", function() {
                    // Remove 'img-selected' class from all category divs first
                    const allCategoryDivs = searchDiv.querySelectorAll(".category-item img");
                    allCategoryDivs.forEach(img => img.classList.remove("img-selected"));

                    // Toggle 'img-selected' class only for the clicked image
                    categoryImg.classList.add("img-selected");

                    let mealCategory = categoryList[i].strCategory;
                    updateMealList(mealCategory);
                });

                // Append img and p to the wrapper div
                categoryDiv.appendChild(categoryImg);
                categoryDiv.appendChild(categoryText);

                // Append the wrapper div to searchDiv
                searchDiv.appendChild(categoryDiv);
            }
        })
        // Catch and log errors
        .catch(error => console.error('Error fetching data:', error)); 
    }

initialLoad();

async function updateMealList(mealCategory) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`);
    let data = await response.json();
    const mealItemList = data.meals;
    console.log(mealItemList);

    // Clear previous meal list content before adding new
    mealList.innerHTML = "";

    instructionDiv.textContent = 'Choose a meal from the available meal list.';

    for (let i = 0; i < mealItemList.length; i++) {

        let mealItemDiv = document.createElement("div");
        mealItemDiv.classList.add("meal-item"); 
        
        let mealImg = document.createElement("img");
        mealImg.setAttribute("src", mealItemList[i].strMealThumb);
        mealImg.setAttribute("alt", mealItemList[i].strMeal);
        let mealText = document.createElement("p");
        mealText.textContent = mealItemList[i].strMeal; 
        mealItemDiv.addEventListener("click", function() {
            const allMealDivs = mealList.querySelectorAll(".meal-item img");
            allMealDivs.forEach(img => img.classList.remove("meal-selected")); 
        
            mealImg.classList.add("meal-selected");

            let mealName = mealItemList[i].strMeal;
            selectedMealText.textContent = mealName;
            let mealId = mealItemList[i].idMeal;
            console.log(mealId);
            updateNutritionAndCost(mealId);
        });
        
        mealItemDiv.appendChild(mealImg);
        mealItemDiv.appendChild(mealText);
        mealList.appendChild(mealItemDiv);
    }
}

function updateNutritionAndCost(id) {
    instructionDiv.textContent = 'Please pay for your meal.';
    nutritionInfoText.textContent = ""; 

    let mealInfo = mealInfoDb[id];
    if (mealInfo) {
        // Constructing the string with the nutritional information
        let nutritionInfo = `
            <p>Calories: ${mealInfo.Calories}<br />
            Protein: ${mealInfo.Protein}<br />
            Carbs: ${mealInfo.Carbs}<br />
            Fats: ${mealInfo.Fats}<br />
            Sugar: ${mealInfo.Sugar}</p>
        `;
        // Updating the innerHTML of nutritionInfoText with the constructed string
        nutritionInfoText.innerHTML = nutritionInfo;
        priceInfoText.innerHTML = `${mealInfo.Price}`;
        payButton.classList.add("highlight-button")
        payButton.addEventListener("click", function(){
            let userUpaId;
            do {
                userUpaId = prompt("Please provide your unique UPA COMMS ID to successfully process payment for your chosen meal.", "Unique 6 digit key");
                if (userUpaId === null) { // User cancelled the prompt
                    break;
                }
            } while (userUpaId.length !== 6);

            if (userUpaId !== null && userUpaId.length === 6) {
                alert("UPA ID confirmed. Initiate synthesis to finalize the transaction. Credits will be deducted upon synthesis completion. Thank you for choosing UPA for your dining experience.");
            }
        });

    } else {
        // Handling case where no nutritional info is found for the given id
        nutritionInfoText.textContent = "Nutritional information not available.";

    }
}

