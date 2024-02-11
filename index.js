let searchDiv = document.getElementById("search-div");

// console.log(ingredientList.categories);

async function initialLoad() {
    let ingredientList = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {
            const categoryList = data.categories;
            // Clear placeholder content
            searchDiv.innerHTML = ""; 
// create img element for each category and append to search-div
            for (let i = 0; i < categoryList.length; i++) {
                let categoryImg = document.createElement("img");
                categoryImg.setAttribute("src", categoryList[i].strCategoryThumb); 
                categoryImg.setAttribute("alt", categoryList[i].strCategory); 
                categoryImg.addEventListener("click", function(event){
                    event.target.classList.toggle("img-selected");
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

async function updateMealList(mealCategory){
   let mealList = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`).then(response => response.json()).then(data => {
    const mealItemList = data;
    console.log(mealItemList);
   })
}

// 