function graph9(selectedCountry) {
    console.log('graph9');
    console.log(selectedCountry, billionairesData);

    // Get a reference for the graph div
    const graphChartDiv = document.getElementById('graph9');
    // graphChartDiv.innerHTML = '';

    // Filter data by selected country

     // Filtering data based on the selected country
     let billionairesInCountry = [];
     // Check for All
     if (selectedCountry === 'All') {
        billionairesInCountry = billionairesData;
     } else {
        billionairesInCountry = billionairesData.filter(entry => entry.Country === selectedCountry);
     }

    // Prepare data for the bar chart
    const uniqueIndustries = [...new Set(billionairesInCountry.map(item => item.Industry))];
    const industryCounts = countOccurrences(billionairesInCountry.map(item => item.Industry));

    // Sort industries by industry dominance (counts) in descending order
    const sortedIndustries = uniqueIndustries.sort((a, b) => industryCounts[b] - industryCounts[a]);

    // Select the top 10 industries
    const top10Industries = sortedIndustries.slice(0, 10);

    // Extract counts for the top 10 industries
    const top10IndustryCounts = top10Industries.map(industry => industryCounts[industry] || 0);

    // Industry Dominance Horizontal Bar Chart
    const industryChart = {
        y: top10IndustryCounts,
        x: top10Industries,
        type: 'bar',
        // orientation: 'h', // Set orientation to horizontal
        marker: { color: 'steelblue' },
    };

    const industryLayout = {
        width: 510,
        height: 330,
        title: 'Top 10 Industries',
        yaxis: { title: 'Number of Billionaires' },
        xaxis: {
            // autorange: 'reversed', 
            automargin: true,
            tickfont: { size: 12 }, 
            pad: 4, 
        },
        bargap: 0.2,
    };
    const config = {
        displayModeBar: false,
    };


    Plotly.newPlot(graphChartDiv, [industryChart], industryLayout, config);

    // Function to count occurrences
    function countOccurrences(arr) {
        return arr.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }
}