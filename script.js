const mealList = document.getElementById('meal-list');
const mealSingle = document.getElementById('the-meal');
function searchMeal(event) {
    event.preventDefault();
    let keyword = document.getElementById('search-input').value;
    if (keyword) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then(res => res.json())
        .then(data => {
          if (data?.meals.length > 0) {
            displayMeals(data.meals)
          } else {
            displayError()
          }
        })
    }
}
function displayMeals(meals) {    
    let html = '';
    meals.map(meal => {
        html += `<div class="meal-box" onclick="viewMeal(${meal.idMeal})">
            <img class="meal-img" src="${meal.strMealThumb}" alt="">
            <div class="meal-name">${meal.strMeal}</div>
        </div>`
    })
    mealList.innerHTML = html;
}
function viewMeal(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
          displayMeal(data.meals[0])
        })
}
function displayMeal(meal) {
    let html = '';
    for (let index = 1; index <= 20; index++) {
        if (meal['strIngredient'+index] != '' && meal['strIngredient'+index] != null) {
            html += `
                <li>${meal['strIngredient'+index]}</li>
              `  
        }
    }
    mealSingle.innerHTML = `<div class="meal-box">
            <img class="meal-img" src="${meal.strMealThumb}" alt="">
            <div class="meal-name">${meal.strMeal}</div>
            <div class="ingredients">
                <ol>
                   ${html}
                </ol>
            </div>
        </div>`
}