let searchDiv = document.getElementById("search-div");

// console.log(ingredientList.categories);

async function initialLoad() {
    ingredientList = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {
            const categoryList = data.categories;
            searchDiv.innerHTML = ""; // Clear placeholder content
// create img element for each category and append to search-div
            for (let i = 0; i < categoryList.length; i++) {
                let categoryImg = document.createElement("img");
                categoryImg.setAttribute("src", categoryList[i].strCategoryThumb); 
                categoryImg.setAttribute("alt", categoryList[i].strCategory); 
                searchDiv.appendChild(categoryImg);
            }
        })
        // Catch and log errors
        .catch(error => console.error('Error fetching data:', error)); 
}

initialLoad();

function selectCategory(){

}