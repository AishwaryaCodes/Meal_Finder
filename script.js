const searchForm = document.querySelector('.meal-search-box');
const mealSearchResults = document.querySelector('.meal-search-results')
const recipeContainer = document.querySelector('.recipe-container')
const recipeToResultsBtn = document.querySelector('.recipe-overview i');
const resultToHomeBtn = document.querySelector('.search-results-title i')
const searchField = document.querySelector('.search-content')
const searchResultsTitle = document.querySelector('.search-results-title h2');
const mealGrid= document.querySelector('.meal-grid')
const header = document.querySelector('header');

//submitting form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = searchField.value.trim();
    if(!searchTerm){
        alert('Please enter something!')
    }
    else{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then( res => res.json())
    .then(data => {
        const mealsData = data.meals;
        if(!mealsData){
            searchResultsTitle.innerText = `No results for ${searchTerm}`;
        }else{
            searchResultsTitle.innerText = `Search results for ${searchTerm}`;
            console.log(mealsData);
            mealsData.forEach(meal =>{
                let mealItem = document.createElement('div')
                mealItem.classList.add('meal-item');
                mealItem.innerHTML =  `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <h4 class="meal-name">${meal.strMeal}</h4>
                <button class="get-recipe-btn"onclick="getRecipeDetail(${meal.idMeal})">Get Recipe<i class="fas fa-arrow-right"></i></button>`
                mealGrid.appendChild(mealItem);
                  })   
        }
    });
    searchTerm.value = '';
    mealSearchResults.classList.add('show');
    header.style.backgroundColor = 'white';
}    
})


const getRecipeDetail = (mealId) =>{
    mealSearchResults.classList.remove('show');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
      .then(data => {
         const meal = data.meals[0];
          console.log(meal);
          const ingredients = [];
          
            for(let i = 0 ; i <= 20 ;i++){
               if(meal[`strIngredient${i}`]){
                  ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`);
               }
               else{
                  continue;
               }
            }

          recipeContainer.innerHTML = `
          <div class="recipe-overview">
          <i class="fas fa-arrow-left" onclick="goToResults()"></i>
          <div class="recipe-info">
            <h2 class="recipe-name">${meal.strMeal}</h2>
          </div>
        </div>
        <div class="recipe-img">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        </div>
        <div class="recipe-detail">
          <div class="ingredients">
            <div class="badge">Ingredients</div>
            <ul>
            ${ingredients.map(ing =>`<li>${ing}</li>`).join('')}
            </ul>
          </div>
          <div class="instructions">
            <div class="badge">Instructions</div>
            <p>${meal.strInstructions}</p>
          </div>
        </div>
      </div>
          `        

      });  
    recipeContainer.classList.add('show');
}

const goToResults = () =>{
    recipeContainer.classList.remove('show');
    mealSearchResults.classList.add('show');
}

resultToHomeBtn.addEventListener('click', ()=>{
    mealSearchResults.classList.remove('show');
    window.location.reload();
})

header.querySelectorAll('a').forEach(tag => tag.addEventListener('click', ()=>{
    window.location.reload();
}))