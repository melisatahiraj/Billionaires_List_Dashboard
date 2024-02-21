function graph1(selectedCountry) {
    console.log("graph1");
    console.log(selectedCountry, billionairesData);
  
    // Get a reference for the graph div
    // const graphChartDiv = document.getElementById('graph1');
    // graphChartDiv.innerHTML = '';
  
    // TODO: Graph code goes here
  
    // Initialize a variable to count the total number of billionaires
    let totalBillionairesCount = 0;
  
    // Loop through each billionaire in the data
    billionairesData.forEach((billionaire) => {
      let country = billionaire["Country"];
      let age = billionaire["Age"];
  
    // Check if the billionaire is from the selected country and has a valid age
      if (country === selectedCountry && age !== "N/A") {
        totalBillionairesCount++;
      }
    });
  
    // Store the total count of billionaires for the selected country
    let totalBillionaires = totalBillionairesCount;
  
    // Filter the data to include only billionaires from the selected country with valid age
    let filteredData = [];
    // Check for All
    if (selectedCountry === 'All') {
        filteredData = billionairesData;
    } else {
        filteredData = billionairesData.filter(
          (sample) => sample["Country"] === selectedCountry && sample["Age"] !== "N/A"
        );
    }


    console.log(filteredData);


    // Define a function to create a pie chart based on age distribution
    function pieChart(dataValues) {
      let ageGroups = {
        "10-19": 0,
        "20-29": 0,
        "30-39": 0,
        "40-49": 0,
        "50-59": 0,
        "60-69": 0,
        "70-79": 0,
        "80-89": 0,
        "90+": 0,
      };
  
      // Iterate through each billionaire's age and update the corresponding age group count
      dataValues.forEach(({ Age }) => {
        let ageNum = parseFloat(Age);
        if (ageNum >= 90) {
          ageGroups["90+"]++;
        } else {
          let ageGroup = Math.floor(ageNum / 10) * 10;
          let ageGroupLabel = `${ageGroup}-${ageGroup + 9}`;
          ageGroups[ageGroupLabel]++;
        }
      });
      console.log(Object.values(ageGroups));

      // Define the order of age groups for displaying in the pie chart
      let ageGroupOrder = [
        "10-19",   
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70-79",
        "80-89",
        "90+",
      ];
  
      // Store values of the variables for the pie chart
      let labels = [];
      let values = [];
      let colors = [];
  
      let fixedColors = {
        "10-19": "#628f70",
        "20-29": "#003333",
        "30-39": "#0f8f84",
        "40-49": "#529191",
        "50-59": "#4fb6b6",
        "60-69": "#01d9d9",
        "70-79": "#43b995",
        "80-89": "#00ae79",
        "90+": "#00874c",
      };
  
      // Iterate through each age group and add data to respective arrays
      ageGroupOrder.forEach((label) => {
        if (ageGroups[label] > 0) {
          labels.push(label);
          values.push(ageGroups[label]);
          colors.push(fixedColors[label]);
        }
      });

      if (ageGroups["90+"] > 0) {
        labels.push("90+");
        values.push(ageGroups["90+"]);
        colors.push(fixedColors["90+"]);
      }
      console.log("DATA >>>>", labels);


      // Define data for the pie chart
      let pieData = [
        {
          values: values,
          labels: labels,
          type: "pie",
          name: "Age Distribution",
          marker: {
            colors: colors,
            line: {
              color: "black",
              width: 1,
            },
          },
          hoverinfo: "label+value",
          textinfo: "percent",
          textposition: "inside",
          hole: 0.5,
          sort: false,
        },
      ];
  

      // Define layout for the pie chart
      let pieLayout = {
        mmargin: { l: 0, r: 0, b: 0, t: 0, pad:0 },
        height: 400,
        width: 400,
        annotations: [
          {
            font: { size: 8 },
            showarrow: false,
            text:
              "<b>Age Distribution</b> <br> <b><i> Total Billionaires: " +
              totalBillionaires +
              "</i></b>",
            x: 0.5,
            y: 0.5,
          },
        ],
        showlegend: true,
        legend: {
          x: 1.5,
          xanchor: "right",
          y: 1,
          yanchor: "top",
          bordercolor: "#000",
          borderwidth: 1,
        },
      };
      const config = {
        displayModeBar: false,
      };
      
      // Plot the pie chart
      Plotly.newPlot("pie", pieData, pieLayout, config);
    }
    
    // Call pie chart
    pieChart(filteredData);
  }