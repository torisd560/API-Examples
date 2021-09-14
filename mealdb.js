const searchFood = () => {
    const searchField = document.getElementById('search-feild');
    const searchText = searchField.value
    searchField.value = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displayResult(data.meals))
}
const displayResult=meals=> {
    const searchResult = document.getElementById('search-result');
    searchResult.style.cursor='pointer'
    searchResult.textContent = '';
    meals.forEach(meal => {
    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = `
     <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
        <img src=" ${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
            </div>
    </div>
    `;
    searchResult.appendChild(div)
    });
}
const loadMealDetail= mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res=> res.json())
    .then(data=> displayMealDetail(data.meals[0]))
}
const displayMealDetail =meal=>{
const mealDetail = document.getElementById('meal-detail');
mealDetail.textContent='';
const div = document.createElement('div')
div.classList.add('card')
div.innerHTML= `
<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
          <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
`;
mealDetail.appendChild(div)
}