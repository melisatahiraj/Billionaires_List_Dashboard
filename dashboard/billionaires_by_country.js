function billionairesByCountry(selectedCountry){
    console.log(selectedCountry, billionairesData)
    // Get a reference for the billionaires-by-country-chart div
    const wordCloudDiv = document.getElementById('billionaires-by-country-chart');

    // Filter data by selected country
    
    let billionairesInCountry = [];
    // Check for All
    if (selectedCountry === 'All') {
      billionairesInCountry = billionairesData;
    } else {
      billionairesInCountry = billionairesData.filter(obj => obj["Country"] === selectedCountry);
    }


    // Create an array of words based on the source and count them
    const words = {};
    billionairesInCountry.forEach(billionaire => {
      const source = billionaire.Source + '';
      if(words[source]){
        words[source] = words[source] + 1;
      } else {
        words[source] = 1;
      }
    });

    // Convert the object to an array of key-value pairs
    const sourceArray = Object.entries(words);

    // Sort the array based on the value (occurrence count) in descending order
    sourceArray.sort((a, b) => b[1] - a[1]);

    // Slice the array to get the top 10 items
    const top10Sources = sourceArray.slice(0, 10);
    console.log('top10Sources', top10Sources)

    const layoutWidth = 300;
    const layoutHeight = 300;

    const positions = [
      { x: layoutWidth * 0.35, y: layoutHeight * 0.7 },
      { x: layoutWidth * 0.5, y: layoutHeight * 0.3 },
      { x: layoutWidth * 0.4, y: layoutHeight * 0.9 },
      { x: layoutWidth * 0.35, y: layoutHeight * 0.4 },
      { x: layoutWidth * 0.4, y: layoutHeight * 0.5 },
      { x: layoutWidth * 0.2, y: layoutHeight * 0.6 },
      { x: layoutWidth * 0.7, y: layoutHeight * 0.1 },
      { x: layoutWidth * 0.7, y: layoutHeight * 0.8 },
      { x: layoutWidth * 0.5, y: layoutHeight * 0.2 },
      { x: layoutWidth * 0.1, y: layoutHeight * 0.5 },
    ];

    const minTextSize = 10;
    const maxTextSize = 30;
   
    // Assuming word[0] contains the values that need to be standardized
    // You may adjust this logic based on your actual data
    const minWordValue = Math.min(...top10Sources.map(word => word[1]));
    const maxWordValue = Math.max(...top10Sources.map(word => word[1]));

    const standardizeValue = value => {
      // Map the value to the range [minTextSize, maxTextSize]
      const normalizedValue = (value - minWordValue) / (maxWordValue - minWordValue);
      const textSize = minTextSize + normalizedValue * (maxTextSize - minTextSize);

      return textSize;
    };
    const predefinedColors = [
      '#24deff', 
      '#13dbfe', 
      '#04d6fb', 
      '#07c5e6', 
      '#06b6d4', 
      '#09abc8', 
      '#0ba0bb', 
      '#0d96ae', 
      '#0f8ca2', 
      '#108296'
    ];

    const wordCloudData = [{
      type: 'scatter',
      mode: 'text',
      text: top10Sources.map(word => word[0]),
      textfont: {
        size: [30, 28, 26, 24, 20, 18, 16, 14, 10, 8],
        color: predefinedColors
      },
      marker: {
        color: predefinedColors, // Use the predefined colors for each word
      },
      x: positions.map(pos => pos.x),
      y: positions.map(pos => pos.y),
    }];

    const config = {
      displayModeBar: false,
    };

    const layout = {
      width: layoutWidth,
      height: layoutHeight,
      showlegend: false,
      xaxis: {
        showgrid: false,
        zeroline: false,
        showline: false,
        showticklabels: false,
      },
      yaxis: {
        showgrid: false,
        zeroline: false,
        showline: false,
        showticklabels: false,
      },
      margin: { l: 0, r: 0, b: 0, t: 0, pad: 0 },
      updatemenus: [],  // This line removes the Plotly controls
    };

    Plotly.newPlot(wordCloudDiv, wordCloudData, layout, config);
}