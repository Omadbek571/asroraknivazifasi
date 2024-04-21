const cocktailsCenter = document.querySelector(".cocktails-center");
const loader = document.querySelector('.loader');
const input = document.getElementById('input');
const search_error__text = document.querySelector('.search_error__text');
const sectionTitle = document.querySelector(".section-title");

loader.classList.remove('hidden');

getDrink('search.php?s=');
function createDrinks(data){
    cocktailsCenter.innerHTML = ""
    data.drinks.forEach((item) => {
        const article = document.createElement('article');
        article.classList.add('cocktail');
        article.innerHTML = `
        <div class="img-container"><img src=${item.strDrinkThumb} alt='${item.strDrink}'></div><div class="cocktail-footer"><h3>${item.strDrink}</h3><h4>${item.strGlass}</h4><p>${item.strAlcoholic}</p><a class="btn btn-primary btn-details" href="./about.html?item=${item.idDrink}">details</a></div>
                        `
        cocktailsCenter.appendChild(article);
    });
}

input.addEventListener('input', (e) =>{
    const url =`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.target.value}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            loader.classList.add('hidden');
            search_error__text.classList.add('hidden')
            sectionTitle.classList.remove('hidden')
            createDrinks(data)})
        .catch((error) =>{
            loader.classList.add('hidden');
            search_error__text.classList.remove('hidden')
            sectionTitle.classList.add('hidden')
            // errorEL.classList.remove('hidden');
        });
});

function getDrink(dataType){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/${dataType}`)
        .then((res) => res.json())
        .then((data) => {
            loader.classList.add('hidden');
            createDrinks(data)})
        .catch((error) =>{
            loader.classList.add('hidden');
            // errorEL.classList.remove('hidden');
        });
}

