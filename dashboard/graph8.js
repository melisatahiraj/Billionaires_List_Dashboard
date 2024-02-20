function graph8(selectedCountry) {
    console.log('graph8');
    console.log(selectedCountry, billionairesData);

    // Get a reference for the graph div
    const graphChartDiv = document.getElementById('graph8');
    graphChartDiv.innerHTML = ''; // Clear previous content

    // Filtering data based on the selected country
    const countryBillionairesData = billionairesData.filter(entry => entry.Country === selectedCountry);

    // Filtering names containing "family"
    const familyNames = countryBillionairesData.filter(entry => entry.Name.includes("family"));

    // Counting the number of family names
    const familyCount = familyNames.length;

    console.log(`Number of billionaires with family names in ${selectedCountry}:`, familyCount);

    // Counting the number of individual billionaires
    const individualCount = countryBillionairesData.length - familyCount;

    console.log(`Number of individual billionaires in ${selectedCountry}:`, individualCount);

    // Creating card visualizations
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const familyCard = createCard('Billionaires as Family', familyCount);
    const individualCard = createCard('Billionaires as Individuals', individualCount);

    cardContainer.appendChild(familyCard);
    cardContainer.appendChild(individualCard);

    graphChartDiv.appendChild(cardContainer);

    const ctx = document.getElementById('polarChart').getContext('2d');

    // If an existing chart is found, and it is a Chart.js instance, destroy it
    if (window.polarChart instanceof Chart) {
        window.polarChart.destroy();
    }

    const polarChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: [`Billionaires with family names in ${selectedCountry}`],
            datasets: [{
                label: 'Count',
                data: [familyCount],
                backgroundColor: [
                    'rgba(0, 136, 204)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 5, // Adjust max value for better visualization
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Billionaires as Individual vs Family Wealth in ${selectedCountry}`
                }
            }
        }
    });

    // Store the chart instance in the global scope
    window.polarChart = polarChart;
}

function createCard(title, count) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.fontSize = '12px'; // Adjust the font size here

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;

    const countText = document.createElement('p');
    countText.textContent = `Count: ${count}`;

    card.appendChild(cardTitle);
    card.appendChild(countText);

    return card;
};