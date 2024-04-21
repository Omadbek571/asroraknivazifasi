const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('item');
const main = document.getElementById('main');
const aboutText = document.querySelector('.about__text');

loader.classList.remove('hidden');
function createDrinksEl(data){
    main.innerHTML = ""
    data.forEach((item) => {
        const section = document.createElement('section');
        section.classList.add('section');
        section.classList.add('cocktail-section');
        section.innerHTML = `
        <a class="btn btn-primary" href="./index.html">back home</a>
        <h2 class="section-title">${item.strDrink}</h2>
        <div class="drink">
            <img
                src=${item.strDrinkThumb}
                alt="${item.strDrink}"
            />
            <div class="drink-info">
                <p><span class="drink-data">name :</span>${item.strDrink}</p>
                <p>
                    <span class="drink-data">category :</span> ${item.strCategory}
                </p>
                <p><span class="drink-data">info :</span> ${item.strAlcoholic}</p>
                <p>
                    <span class="drink-data">glass :</span>${item.strGlass}
                </p>
                <p>
                    <span class="drink-data">instructons :</span> ${item.strInstructions}
                </p>
                <p>
                    <span class="drink-data">ingredients :</span
                    ><span> ${item.strIngredient1 ? item.strIngredient1 : ""}</span><span>${item.strIngredient2 ? item.strIngredient2 : ""}</span
                    ><span> ${item.strIngredient3 ? item.strIngredient3 : ""}</span><span>${item.strIngredient4 ? item.strIngredient3 : ""}</span>
                </p>
            </div>
        </div>
        `
        main.appendChild(section);
        loader.classList.add('hidden');
    });
}

fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${myParam}`)
.then((res) => res.json())
.then((data) => {
    aboutText.classList.add('hidden');
    loader.classList.add('hidden');
    createDrinksEl(data.drinks)})
.catch((error) =>{
    loader.classList.add('hidden');
    // errorEL.classList.remove('hidden');
});