function graph2(){
    console.log('graph2')
    console.log(billionairesData)

    // Get a reference for the graph div
    //const graphChartDiv = document.getElementById('graph2');
    //graphChartDiv.innerHTML = '';

   // TODO: Graph code goes here

//    let filteredData = billionairesData.filter(sample => sample['Country'] === selectedCountry);
//    console.log(filteredData);

    billionairesData.forEach((entry) => {
        entry.Wealth = parseNetWorth(entry['Net Worth']);
    });


    bubbleChart(billionairesData);
}


function parseNetWorth(netWorth) {
    return parseFloat(netWorth.replace('$', '').replace('B', ''));
}


function bubbleChart(dataValues) {
        
    let ages = dataValues.map(row => row.Age);
    let netWorth = dataValues.map(row => row.Wealth);
    let countries = dataValues.map(row => row.Country);
    

    // let uniqueCountries = [...new Set(countries)];
    // let colorMap = {};
    // uniqueCountries.forEach((country, index) => {
    //     colorMap[country] = index/uniqueCountries.length;
    // });

    let colorPalette = ['#dd2020', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
    let colorMap = {};
    countries.forEach((country, index) => {
        if (!colorMap[country]) {
            colorMap[country] = colorPalette[Object.keys(colorMap).length];
        }
    });

    let markerSize = netWorth.map(value => value * 0.5);
    let markerColor = countries.map(country => colorMap[country]);
    
    // Create trace2 for the bubble chart
    let bubbleData = [{
        x: ages,
        y: netWorth,
        text: dataValues.map(row => `${row.Name} - ${row['Net Worth']} (${row.Country})`),
        mode: "markers",
        marker: {
            size: markerSize,
            color: markerColor,
            //colorscale: "Portland",
            type: "heatmap"
        },
    }];
        
    
    // Create layout for the bubble chart
    let bubbleLayout = {
        title: '<b>Age & Net Worth</b>',
        hovermode: "closest",
        margin: {
            l: 50,
            t: 30,
            r: 30,
            b: 30,
        },
        height: 500,
        width: 750,
        xaxis: {title: "Age"},
        yaxis: {
            title: 'Wealth',
            range: [0, 250],
            dtick: 20,
            tickvals: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
            ticktext: ['0B', '20B', '40B', '60B', '80B', '100B', '120B', '140B', '160B', '180B', '200B', '220B', '240B']
        },
    };
    
    // Plot the bubble chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

}

graph2();




// function bubbleGraph2(billionairesData) {
//     console.log('graph2')
//     console.log(billionairesData)

//     // Get a reference for the graph div
//     //const graphChartDiv = document.getElementById('graph2');
//     //graphChartDiv.innerHTML = '';

//     // let filteredData = billionairesData.filter(sample => sample['Country'] === selectedCountry);
//     // console.log(filteredData);
 
 
//     billionairesData.forEach((entry) => {
//          entry.Wealth = parseNetWorth(entry['Net Worth']);
//      });
 
//     function parseNetWorth(netWorth) {
//          return parseFloat(netWorth.replace('$', '').replace('B', ''));
//      }
 
 
 
//     function bubbleChart2(dataValues) {
         
//          let ages2 = dataValues.map(row => row.Age);
//          let netWorth2 = dataValues.map(row => row.Wealth);
     
//          markerSize2 = netWorth2.map(value => value);
//          markerColor2 = netWorth2.map(value => value);
     
//          // Create trace2 for the bubble chart
//          let bubbleData2 = [{
//              x: ages2,
//              y: netWorth2,
//              text: dataValues.map(row => `${row.Name} - ${row['Net Worth']} (${row.Country})`),
//              mode: "markers",
//              marker: {
//                  size: markerSize2,
//                  color: markerColor2,
//                  colorscale: "Jet",
//                  type: "heatmap"
//             },
//         }];
     
     
//          // Create layout for the bubble chart
//          let bubbleLayout2 = {
//             title: '<b>Age & Net Worth</b>',
//             hovermode: "closest",
//             margin: {
//                 l: 50,
//                 t: 30,
//                 r: 30,
//                 b: 30,
//             },
//             height: 500,
//             width: 950,
//             xaxis: {title: "Age"},
//             yaxis: {
//                 title: 'Wealth',
//                 range: [0, 250],
//                 dtick: 20,
//                 tickvals: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
//                 ticktext: ['0B', '20B', '40B', '60B', '80B', '100B', '120B', '140B', '160B', '180B', '200B', '220B', '240B']
//             },
 
//         };
     
//          // Plot the bubble chart
//          Plotly.newPlot("bubble2", bubbleData2, bubbleLayout2);
//     }
 
//     bubbleChart2(billionairesData);

// }