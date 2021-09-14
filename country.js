const loadCountries =() =>{
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res=>res.json())
    .then(data=>displayCountries(data))
}
loadCountries()
const displayCountries = countries =>{
    const countryContainer = document.getElementById('countries');
    countries.forEach(country => {
    const div = document.createElement('div')
    div.classList.add('country')
    div.innerHTML = ` 
    <h4> Country-Name : ${country.name} </h4>
    <p> Capital : ${country.capital}</p>
    <button onclick="loadCountryByName('${country.name}')">Details</button>
    `
    countryContainer.appendChild(div)
    });
}
const loadCountryByName =name => {
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(res=> res.json())
    .then(data=>displayCountryDetails(data[0]))
}
const displayCountryDetails=country=>{
    const countryDetailsDiv = document.getElementById('country-details');
    countryDetailsDiv.innerHTML=`
    <h4>${country.name}</h4>
    <p>${country.population}</p>
    <img  width = "200px" height="75px" src ="${country.flag}">
    `
}
