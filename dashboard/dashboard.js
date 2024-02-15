// dashboard.js
let billionairesData = [];
document.addEventListener("DOMContentLoaded", function () {
    // Use D3 to load data
    d3.json('Billionaires.json').then(function(data) {
        console.log(data);

        // Global data
        billionairesData = data;
    
        // Extract unique countries
        const uniqueCountries = [];

        data.forEach(obj => {
            const country = obj["Country"];
            if (!uniqueCountries.includes(country)) {
                uniqueCountries.push(country);
            }
        });

        // Sort unique countries alphabetically
        uniqueCountries.sort();

        console.log(uniqueCountries);

        // Get a reference to the select element (dropdown)
        const selectElement = document.getElementById('countrySelect');

        // Populate the select element with unique countries
        uniqueCountries.forEach(country => {
            const optionElement = document.createElement('option');
            optionElement.textContent = country;
            selectElement.appendChild(optionElement);
        });
    handleSelectChange({value:uniqueCountries[0]});

    }).catch(function(error) {
        console.error('Error loading data:', error);
    });
});


// Function to handle data whenever we change the country
function handleSelectChange(selectElement) {
    const selectedCountry = selectElement.value;
    console.log(`Selected country: ${selectedCountry}`);
    billionairesByCountry(selectedCountry)
    graph1(selectedCountry)
    graph2(selectedCountry)
    graph3(selectedCountry)
    graph4(selectedCountry)
    graph5(selectedCountry)
    graph6(selectedCountry)
    graph7(selectedCountry)
    graph8(selectedCountry)
    graph9(selectedCountry)
}

