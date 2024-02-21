function graph9(selectedCountry) {
    console.log('graph9');
    console.log(selectedCountry, billionairesData);

    // Get a reference for the graph div
    const graphChartDiv = document.getElementById('graph9');

    // Filtering data based on the selected country
    let billionairesInCountry = [];
    // Check for All
    if (selectedCountry === 'All') {
        billionairesInCountry = billionairesData;
    } else {
        billionairesInCountry = billionairesData.filter(entry => entry.Country === selectedCountry);
    }

    // Prepare data for the bar chart
    const uniqueCountries = [...new Set(billionairesInCountry.map(item => item.Country))];
    const countryBillionaireCounts = countOccurrences(billionairesInCountry.map(item => item.Country));

    // Sort countries by billionaire counts in descending order
    const sortedCountries = uniqueCountries.sort((a, b) => countryBillionaireCounts[b] - countryBillionaireCounts[a]);

    // Select the top 10 countries
    const top10Countries = sortedCountries.slice(0, 10);

    // Extract counts for the top 10 countries
    const top10CountryBillionaireCounts = top10Countries.map(country => countryBillionaireCounts[country] || 0);

    // Color
    const pickColor = '440154';

    // Country Billionaire Counts Bar Chart
    const countryChart = {
        x: top10CountryBillionaireCounts,
        y: top10Countries,
        type: 'bar',
        orientation: 'h', // Set orientation to horizontal
        marker: {
            color: pickColor,
        },
    };

    const countryLayout = {
        width: 510,
        height: 330,
        title: 'Top 10 Countries by Billionaire Count',
        xaxis: { title: 'Number of Billionaires' },
        yaxis: {
            autorange: 'reversed',
            automargin: true,
            tickfont: { size: 12 },
            pad: 4,
        },
        bargap: 0.2,
    };
    const config = {
        displayModeBar: false,
    };

    Plotly.newPlot(graphChartDiv, [countryChart], countryLayout, config);

    // Function to count occurrences
    function countOccurrences(arr) {
        return arr.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }
}