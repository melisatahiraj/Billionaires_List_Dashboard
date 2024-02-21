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
    const countryNetWorths = {};

    // Aggregate net worths for each country
    billionairesInCountry.forEach(entry => {
        const country = entry.Country;
        const netWorth = entry['Net Worth(In Billions)'];
        
        if (!countryNetWorths[country]) {
            countryNetWorths[country] = 0;
        }

        countryNetWorths[country] += netWorth;
    });

    // Convert the object to an array of key-value pairs
    const countryArray = Object.entries(countryNetWorths);

    // Sort the array based on net worth in descending order
    countryArray.sort((a, b) => b[1] - a[1]);

    // Select the top 5 countries
    const top5Countries = countryArray.slice(0, 5);

    // Extract net worths for the top 5 countries
    const top5CountryNetWorths = top5Countries.map(country => country[1]);

    // Color
    const pickColor = '440154';

    // Country Net Worths Bar Chart
    const countryChart = {
        x: top5CountryNetWorths,
        y: top5Countries.map(country => country[0]),
        type: 'bar',
        orientation: 'h', // Set orientation to horizontal
        marker: {
            color: pickColor,
        },
    };

    const countryLayout = {
        width: 510,
        height: 310,
        title: 'Top 5 Countries by Total Net Worth',
        xaxis: { title: 'Total Net Worth (in Billion USD)' },
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
}
