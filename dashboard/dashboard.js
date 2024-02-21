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

        // Set the default selection to United States
        selectElement.value = 'United States';

        // Trigger the change event to update the graphs
        handleSelectChange({ value: 'United States' });

    // handleSelectChange({value:uniqueCountries[0]});

    }).catch(function(error) {
        console.error('Error loading data:', error);
    });
});

function clearAllTiles() {
    const graph0Div = document.getElementById('billionaires-by-country-chart');
    const graph1Div = document.getElementById('graph2');
    const graph2Div = document.getElementById('graph2');
    const graph3Div = document.getElementById('graph3');
    const graph4Div = document.getElementById('graph4');
    const graph5Div = document.getElementById('graph5');
    const graph6Div = document.getElementById('graph6');
    const graph7Div = document.getElementById('graph7');
    const graph8Div = document.getElementById('graph8');
    const graph9Div = document.getElementById('graph9');
    const graph10Div = document.getElementById('graph10');
    const graph11Div = document.getElementById('graph11');
    const graph12Div = document.getElementById('graph12');
    const graph13Div = document.getElementById('graph13');
    const graph14Div = document.getElementById('graph14');

    graph0Div.innerHTML = "";
    graph1Div.innerHTML = "";
    graph2Div.innerHTML = "";
    graph3Div.innerHTML = "";
    graph4Div.innerHTML = "";
    graph5Div.innerHTML = "";
    graph7Div.innerHTML = "";
    graph8Div.innerHTML = "";
    graph9Div.innerHTML = "";
    graph10Div.innerHTML = "";
    graph11Div.innerHTML = "";
    graph12Div.innerHTML = "";
    graph13Div.innerHTML = "";
    graph14Div.innerHTML = "";

}


// Function to handle data whenever we change the country
function handleSelectChange(selectElement) {
    const selectedCountry = selectElement.value;
    console.log(`Selected country: ${selectedCountry}`);
    clearAllTiles();
    billionairesByCountry(selectedCountry)
    graph1(selectedCountry)
    graph2(selectedCountry)
    graph3(selectedCountry)
    graph4(selectedCountry)
    graph5(selectedCountry)
    // graph6(selectedCountry)
    graph7(selectedCountry)
    graph8(selectedCountry)
    graph9(selectedCountry)
    graph10(selectedCountry)
    graph11(selectedCountry)
    graph12(selectedCountry)
    graph13(selectedCountry)
    graph14(selectedCountry)
}

