function graph3(selectedCountry){
    console.log('graph3')
    console.log(selectedCountry, billionairesData);

    let filteredData = [];
    // Check for All
    if (selectedCountry === 'All') {
        filteredData = billionairesData;
    } else {
        filteredData = billionairesData.filter(obj => obj["Country"] == selectedCountry);
    }

    // calculate total net worth for each industry
    const netWorthByIndustry = filteredData.reduce((acc, obj) => {
        const industry = obj ["Industry"];
        acc[industry] = acc[industry] ? acc[industry] + obj["Net Worth(In Billions)"] : obj["Net Worth(In Billions)"];
        console.log(acc[industry])
        return acc;
    }, {});

    // sort industries by total net worth
    const sortedIndustries = Object.keys(netWorthByIndustry).sort((a, b) => netWorthByIndustry[b] - netWorthByIndustry[a]);

    //console.log(sortedIndustries)
    //Prepare data for the plot
    const topIndustries = sortedIndustries.slice(0,5);
    const industryValues = topIndustries.map(industry => netWorthByIndustry[industry]);

    const colors = ['#0a2d4d', '#6186a7', '#6fa8dc', '#9fc5e8', '#c3e1fd']
    

    const data = [{
        x: topIndustries,
        y: industryValues,
        type: 'line',
        name: selectedCountry,
        marker: {
            color: colors
        }
    }]

    const layout = {
        title: {text: `Top 5 Industries by Total Net Worth for ${selectedCountry}`,
                x: 0.5,
                xanchor: 'center',
                y: 0.95,
                yanchor: 'top',
                pad: {
                    t: 10,
                    b: 30,
                    l: 0,
                    r: 5
                }},
        yaxis: {title: 'Total Net Worth (In Billions)', automargin: true},
        width: 500
    }

    const config = {
        displayModeBar: false,
      };

    Plotly.newPlot('graph3', data, layout, config);
}    

   