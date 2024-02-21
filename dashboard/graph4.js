function graph4(selectedCountry){
    console.log('graph4')
    console.log(selectedCountry, billionairesData)

    console.log('graph4')
    console.log(selectedCountry, billionairesData)

    // filter data by selected country
    const filteredData = billionairesData.filter(obj => obj["Country"] === selectedCountry);
    
    //Prepare data for the plot
    const labelData = filteredData.map(obj => obj['Source']).slice(0,5)
    const values = filteredData.map(obj => obj["Net Worth(In Billions)"]).slice(0,10);

    //const colors = ['#0a2d4d', '#6186a7', '#6fa8dc', '#9fc5e8', '#c3e1fd']
    
    console.log(labelData, values)
    const data = [{
        type: "treemap",
        labels: labelData,
        values: values,
        parents: labelData.map(() => null),
        texttemplate: "%{label}<br>%{value} Billions",
        textinfo: "label+value",
        root_color: "lightgrey"

    }];

    const layout = {
        margin: {t: 30, l: 20, r: 0, b: 0},
        title: `Top 5 Sources By Total Net Worth for ${selectedCountry}`,
        width: 300
    }
    const config = {
        displayModeBar: false,
      };

    Plotly.newPlot('graph4', data, layout, config);
}  