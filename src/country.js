const countryName = new URLSearchParams(location.search).get('name');
const flagImg = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries');

const themeChanger = document.querySelector('.theme-changer');

// Function to toggle and save the theme to localStorage
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

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        flagImg.src = country.flags.svg;
        countryNameH1.innerText = country.name.common;

        nativeName.innerText = country.name.nativeName
            ? Object.values(country.name.nativeName)[0].common
            : country.name.common;

        population.innerText = country.population.toLocaleString();
        region.innerText = country.region;
        subRegion.innerText = country.subregion || '';
        capital.innerText = country.capital || '';
        topLevelDomain.innerText = country.tld.join(', ');
        currencies.innerText = country.currencies
            ? Object.values(country.currencies).map((currency) => currency.name).join(', ')
            : '';
        languages.innerText = country.languages
            ? Object.values(country.languages).join(', ')
            : '';
        
        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        const borderCountryTag = document.createElement('a');
                        borderCountryTag.innerText = borderCountry.name.common;
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
                        borderCountries.append(borderCountryTag);
                    });
            });
        }
    });
