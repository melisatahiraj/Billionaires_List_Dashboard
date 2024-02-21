function graph2(selectedCountry){
    console.log('graph2')
    console.log(selectedCountry, billionairesData)

    billionairesData.forEach((entry) => {
        entry.Wealth = parseNetWorth(entry['Net Worth']);
    });

    let filteredData = [];

    // Check for All
    if (selectedCountry === 'All') {
        filteredData = billionairesData;
    } else {
        filteredData = billionairesData.filter(obj => obj["Country"] == selectedCountry);
    }

    // Create bubbleChart function
    bubbleChart(filteredData, selectedCountry);
};

// Define parseNetWorth function and returns parsed values
function parseNetWorth(netWorth) {
    return parseFloat(netWorth.replace('$', '').replace('B', ''));
}


// Define bubbleChart function 
function bubbleChart(dataValues, selectedCountry) {

    // Extract ages, net worth, and countries from dataValues
    let ages = dataValues.map(row => row.Age);
    let netWorth = dataValues.map(row => row.Wealth);
    let countries = dataValues.map(row => row.Country);

    //cal max and min net worth
    let maxNetWorth = Math.max(...netWorth);
    let minNetWorth = Math.min(...netWorth);

    // Calculate the tick values and tick texts dynamically
    let tickValues = Array.from({ length: 13 }, (_, i) => i * 20);
    let tickTexts = tickValues.map(value => `${value}B`);

    // Define color palette for different countries
    let colorPalette = ['#003333', '#0f8f84', '#529191', '#4fb6b6', '#01d9d9', '#43b995', '#00ae79', '#00874c', '#0a5c38', '#628f70'];
    let colorMap = {};
    countries.forEach((country) => {
        if (!colorMap[country]) {
            colorMap[country] = colorPalette[Object.keys(colorMap).length];
        }
    });

    // Create variables that define markerSize and markerColor
    // let markerSize = netWorth.map(value => value * 0.5);
    let markerSize = netWorth.map(value => (value - minNetWorth) / (maxNetWorth - minNetWorth) * 30 + 5);
    let markerColor = countries.map(country => colorMap[country]);
    
    if (selectedCountry !== 'All') {
        markerColor = [];
        ages.forEach(age => {
            markerColor.push('#00ae79');
        })
        // markerColor = tempColorPalette.splice(markerSize.length);

    }

    // Define data for the bubble chart
    let bubbleData = [{
        x: ages,
        y: netWorth,
        text: dataValues.map(row => `Name: ${row.Name} <br>Net Worth: ${row['Net Worth']} <br>Age: ${row.Age} <br>Country: ${row.Country} <br>Source: ${row.Source} <br>Industry: ${row.Industry}`),
        hoverinfo: 'text',
        mode: "markers",
        marker: {
            size: markerSize,
            color: markerColor
        },
    }];


    // Define layout for the bubble chart
    let bubbleLayout = {
        title: '<b>Age & Net Worth</b>',
        hovermode: "closest",
        margin: {
            l: 60,
            t: 30,
            r: 30,
            b: 50,
        },
        height: 500,
        width: 1000,
        xaxis: {
            title: "Age",
            margin: 10,
        },
        yaxis: {
            title: 'Wealth',
            range: [0, maxNetWorth + 20], // Adjust the range dynamically
            dtick: 20,
            tickvals: tickValues,
            ticktext: tickTexts,
        },
        showlegend: false,
        legend: {
            x: 1.5,
            xanchor: 'right',
            y: 1,
            yanchor: 'top',
            bordercolor: '#000',
            borderwidth: 1
        }
    };

    const config = {
        displayModeBar: false,
      };

    // Plot the bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout, config);
}


// Define handleSelectChange function
// function handleSelectChange(selectedCountry) {
//     console.log('handleSelectChange', selectedCountry);

//     // Filter billionairesData based on selected countries
//     let filteredData = billionairesData.filter(sample => sample['Country'] === selectedCountry);
//     console.log(filteredData);

//     // Call bubble chart 
//     bubbleChart(filteredData);
// }

// init();