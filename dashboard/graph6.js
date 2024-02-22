d3.json('dashboard/Billionaires.json')
  .then(function(billionairesData) {
    // Aggregate net worth by country
    let netWorthByCountry = {};
    billionairesData.forEach(function(billionaire) {
      let country = billionaire['Country'];
      let netWorth = parseFloat(billionaire['Net Worth(In Billions)']);
      if (country in netWorthByCountry) {
        netWorthByCountry[country] += netWorth;
      } else {
        netWorthByCountry[country] = netWorth;
      }
    });

    // Extract country names and net worth values
    let locations = Object.keys(netWorthByCountry);
    let netWorthValues = Object.values(netWorthByCountry);



    let data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: locations,
      z: netWorthValues,
      text: locations,
      colorscale: 'Viridis',
      autocolorscale: false,
      reversescale: true,
      marker: {
        line: {
          color: 'rgb(0,0,0)',
          width: 0.5
        }
      },
      tick0: 0,
      zmin: 0,
      dtick: 1000,
      colorbar: {
        autotic: true,
        tickprefix: '$',
        title: 'Total Wealth in Billions'
    }
    }];

    let layout = {
      title: 'Total Wealth by Country',
      geo: {
        showframe: false,
        showcoastlines: true,
        projection: {
          type: 'robinson'
        }
      },
      // Adjust the width and height of the plot
      width: 850,
      height: 550,
      responsive: true
    };
      // Sort the countries based on total wealth
      let sortedCountries = Object.keys(netWorthByCountry).sort((a, b) => netWorthByCountry[b] - netWorthByCountry[a]);

      // Select the top 5 countries
      let top5Countries = sortedCountries.slice(0, 5);

    const config = {
        displayModeBar: false,
        showLink: false
    };
  

    Plotly.newPlot("graph6", data, layout, config);

  })
  .catch(function(error) {
    console.error('Error reading Billionaires.json:', error);
  });