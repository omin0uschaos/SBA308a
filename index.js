let searchDiv = document.getElementById("search-div");
let mealList = document.getElementById("meal-list");
let instructionDiv = document.getElementById('instruction-section');

// console.log(ingredientList.categories);

async function initialLoad() {
    let ingredientList = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {
            const categoryList = data.categories;
            // Clear placeholder content
            searchDiv.innerHTML = ""; 
            mealList.innerHTML = "";

            // create img and p element for each category, wrap them in a div, and append to search-div
            for (let i = 0; i < categoryList.length; i++) {
                // Create wrapper div
                let categoryDiv = document.createElement("div");
                categoryDiv.classList.add("category-item"); // Optionally add a class for styling

                // Create img element
                let categoryImg = document.createElement("img");
                categoryImg.setAttribute("src", categoryList[i].strCategoryThumb);
                categoryImg.setAttribute("alt", categoryList[i].strCategory);
                
                // Create paragraph element
                let categoryText = document.createElement("p");
                categoryText.textContent = categoryList[i].strCategory; // Set category name as text

                // Add click event listener to the div (or to the img specifically if preferred)
                categoryDiv.addEventListener("click", function(event) {
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

    for (let i = 0; i < mealItemList.length; i++) {
        let mealImg = document.createElement("img");
        mealImg.setAttribute("src", mealItemList[i].strMealThumb);
        mealImg.setAttribute("alt", mealItemList[i].strMeal);

        mealList.appendChild(mealImg);
    }
}