const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
let allCountries;

const themeChanger = document.querySelector('.theme-changer');

// Function to toggle and save theme to localStorage
themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Function to apply the saved theme when the page loads
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

applySavedTheme();  // Apply theme on page load

// Fetching all countries
fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data);
        allCountries = data;
    });

filterByRegion.addEventListener('change', () => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then(renderCountries);
});

function renderCountries(data) {
    countriesContainer.innerHTML = '';
    data.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `src/country.html?name=${country.name.common}`;

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${(country.population).toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
        `;
        countriesContainer.append(countryCard);
    });
}

searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountries.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filteredCountries);
});
