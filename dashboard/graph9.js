function graph9(selectedCountry){
    console.log('graph9')
    console.log(selectedCountry, billionairesData)

    // Get a reference for the graph div
    const graphChartDiv = document.getElementById('graph9');
    graphChartDiv.innerHTML = '';

   // TODO: Graph code goes here
   // Filter data by selected country
   const billionairesInCountry = billionairesData.filter(obj => obj["Country"] === selectedCountry);

   // Prepare data for the horizontal bar chart
   const uniqueIndustries = [...new Set(billionairesInCountry.map(item => item.Industry))];
   const industryCounts = countOccurrences(billionairesInCountry.map(item => item.Industry));

  // Sort industries by industry dominance (counts) in descending order
  const sortedIndustries = uniqueIndustries.sort((a, b) => industryCounts[b] - industryCounts[a]);

  // Industry Dominance Horizontal Bar Chart
  const industryChart = {
      x: sortedIndustries.map(industry => industryCounts[industry] || 0),
      y: sortedIndustries,
      type: 'bar',
      orientation: 'h', // Set orientation to horizontal
      marker: { color: 'steelblue' }
  };

  const industryLayout = {
      width: 500,
      height: 320,
      title: 'Industry Dominance',
      xaxis: { title: 'Number of Billionaires' },
      yaxis: {
          autorange: 'reversed', // Reverse the y-axis to display in descending order
          automargin: true // Add space between y-axis labels and industry names
      }
  };

   Plotly.newPlot(graphChartDiv, [industryChart], industryLayout);

// Function to count occurrences
    function countOccurrences(arr) {
        return arr.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }
} 