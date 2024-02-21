function graph5(selectedCountry) {
    console.log('graph5');
    console.log(selectedCountry, billionairesData);

    // Get a reference for the graph div
    // const graphChartDiv = document.getElementById('graph5');
    // graphChartDiv.innerHTML = '';

    // Filter data to get the top billionaires
    const topBillionaires = billionairesData.filter(b => b.Country === selectedCountry)
        .sort((a, b) => b["Net Worth(In Billions)"] - a["Net Worth(In Billions)"])
        .slice(0, 10); // Get the top 10 billionaires

    const names = topBillionaires.map(b => b.Name);
    let netWorths = topBillionaires.map(b => parseFloat(b["Net Worth(In Billions)"]));

    const colorScale = 'Viridis';

    const data = [{
        type: 'bar',
        x: netWorths,
        y: names,
        orientation: 'h',
        marker: {
            color: netWorths, // Assign the net worths as colors to get the gradient effect
            colorscale: colorScale,
            cmin: Math.min(...netWorths),
            cmax: Math.max(...netWorths),
            reversescale: true // Reverse the color scale

        }
    }];

    const layout = {
        title: 'Top Billionaires',
        xaxis: {
            title: 'Net Worth (in Billions)'
        },
        yaxis: {
            automargin: true,
            autorange: 'reversed',
            tickfont: {
                size: 10
            }
        },
        width: 1000

    };
    const config = {
        displayModeBar: false,
    };
  

    Plotly.newPlot('graph5', data, layout, config);
}