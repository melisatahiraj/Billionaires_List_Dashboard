function graph2(selectedCountry){
    console.log('graph2')
    console.log(selectedCountry, billionairesData)
};

// Define function init()
function init() {

    // Use D3 to load data
    d3.json('Billionaires.json').then((data) => {
        console.log(data);

        // Assign loaded data to the global variable billionairesData
        billionairesData = data;

        // Iterate through each entry in billionairesData and parse the Net Worth value
        billionairesData.forEach((entry) => {
            entry.Wealth = parseNetWorth(entry['Net Worth']);
        });
   
        // Create bubbleChart function
        bubbleChart(billionairesData);
    });
}

// Define parseNetWorth function and returns parsed values
function parseNetWorth(netWorth) {
    return parseFloat(netWorth.replace('$', '').replace('B', ''));
}


// Define bubbleChart function 
function bubbleChart(dataValues) {

    // Extract ages, net worth, and countries from dataValues
    let ages = dataValues.map(row => row.Age);
    let netWorth = dataValues.map(row => row.Wealth);
    let countries = dataValues.map(row => row.Country);

    // Define color palette for different countries
    let colorPalette = ['#003333', '#0f8f84', '#529191', '#4fb6b6', '#01d9d9', '#43b995', '#00ae79', '#00874c', '#0a5c38', '#628f70'];
    let colorMap = {};

    // Map each country to a colorPalette
    countries.forEach((country) => {
        if (!colorMap[country]) {
            colorMap[country] = colorPalette[Object.keys(colorMap).length];
        }
    });


    // Create variables that define markerSize and markerColor
    let markerSize = netWorth.map(value => value * 0.5);
    let markerColor = countries.map(country => colorMap[country]);


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
            range: [0, 250],
            dtick: 20,
            tickvals: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
            ticktext: ['0B', '20B', '40B', '60B', '80B', '100B', '120B', '140B', '160B', '180B', '200B', '220B', '240B']
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

    // Plot the bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}


// Define handleSelectChange function
function handleSelectChange(selectedCountry) {
    console.log('handleSelectChange', selectedCountry);

    // Filter billionairesData based on selected countries
    let filteredData = billionairesData.filter(sample => sample['Country'] === selectedCountry);
    console.log(filteredData);

    // Call bubble chart 
    bubbleChart(filteredData);
}

init();