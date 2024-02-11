let searchDiv = document.getElementById("search-div");
let mealList = document.getElementById("meal-list");

// console.log(ingredientList.categories);

async function initialLoad() {
    let ingredientList = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {
            const categoryList = data.categories;
            // Clear placeholder content
            searchDiv.innerHTML = ""; 
            mealList.innerHTML = "";

            // create img element for each category and append to search-div
            for (let i = 0; i < categoryList.length; i++) {
                let categoryImg = document.createElement("img");
                categoryImg.setAttribute("src", categoryList[i].strCategoryThumb); 
                categoryImg.setAttribute("alt", categoryList[i].strCategory); 
                categoryImg.addEventListener("click", function(event){
                    // Remove 'img-selected' class from all images first
                    const allImages = searchDiv.querySelectorAll("img");
                    allImages.forEach(img => img.classList.remove("img-selected"));
                    
                    //toggle 'img-selected' class only for the clicked image
                    event.target.classList.add("img-selected");
                    
                    let mealCategory = event.target.getAttribute("alt");
                    updateMealList(mealCategory);
                })
                searchDiv.appendChild(categoryImg);
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

// 