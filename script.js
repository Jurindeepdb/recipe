const search = document.querySelector('.search');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeClose= document.querySelector('.recipe-close');


const fetchRecipes = async (query) => {

    recipeContainer.innerHTML="<h2>Fetching recipes...</h2";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipeContainer.innerHTML="";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3> 
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>
            
            `  

            const button = document.createElement('button');
            button.textContent = "View";

            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipe(meal);
            })
            
            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        recipeContainer.innerHTML="<h2>Error</h2";            
    }
}

const fetchIngredient = (meal) => {

    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${ingredient} - ${measure}</li>` 
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipe = (meal) => {
    recipeDetailsContent.innerHTML =`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients : </h3>
        <ul class="IngredientList">${fetchIngredient(meal)}</ul>

        <div>
            <h3>Instructions : </h3>
            <p class = "instructions">${meal.strInstructions}</p>
        </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
}


searchbtn.addEventListener('click', (e)=>{
    e.preventDefault();

    const searchInput = search.value.trim();
    fetchRecipes(searchInput);
});


recipeClose.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

