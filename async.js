//==============================global variable===========================
const errorDiv = document.getElementById('search-error-msg');
const searchResult = document.getElementById('search-result')
const mealDetail = document.getElementById('meal-detail')
const mealNotFound = document.getElementById('meal-not-found')
// ========================pressing enter key for clicking button====================
const searchInput = document.getElementById("search-feild")
const searchBtn = document.getElementById("search-button")
searchInput.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    searchBtn.click();
  }
});
//===================spinner========================================
const toggleSpinner = (displayStyle) => {
  document.getElementById('spinner').style = displayStyle;
}
//=================load data clicking button=========================
const searchFood = async () => {
  const searchField = document.getElementById('search-feild');
  const searchText = searchField.value
  // clear data
  searchField.value = '';
  //================= show spinner================
  toggleSpinner('block')
  // ==================error hanling===============
  if (searchText == '') {
    errorDiv.style.display = 'block';
    searchResult.textContent = ''
    mealDetail.textContent = ''
    return;
  }
  //==================== load data=============================
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
  const data = await res.json()
  displayMealResult(data.meals)
  errorDiv.style.display = 'none';
}
//=======================display meal result UI=======================
const displayMealResult = meals => {
  mealDetail.style.display = 'none'
  mealNotFound.style.visibility = 'hidden'
  searchResult.style.cursor = 'pointer';
  searchResult.textContent = '';
  if (!meals) {
    errorDiv.style.display = 'none';
    mealNotFound.style.visibility = 'visible'
    mealDetail.textContent = ''
    return
  }
  meals.forEach(meal => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
     <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
        <img src=" ${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
            </div>
    </div>
    `;
    searchResult.appendChild(div);
  });
}
//===================load meal detail=================
const loadMealDetail = async mealId => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  const data = await res.json()
  displayMealDetail(data.meals[0])
}
//====================display meal detail================
const displayMealDetail = meal => {
  mealDetail.textContent = '';
  const div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML = `
<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 160)}</p>
          <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
`;
  mealDetail.appendChild(div)
  mealDetail.style.display = 'block'
}