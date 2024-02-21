function graph7(selectedCountry) {
    console.log('graph7');
    console.log(selectedCountry, billionairesData);
  
    // Get a reference for the graph div
    const graphChartDiv = d3.select("#graph7");
    graphChartDiv.html(''); // Clear previous content
  
    // Filter data based on selected country
    let filteredData = billionairesData;
    if (selectedCountry) {
        filteredData = billionairesData.filter(d => d.Country === selectedCountry);
    }
  
    // Convert 'Age' and 'Industry Size' properties to numeric
    filteredData.forEach(d => {
        d.Age = +d.Age;
        d.IndustrySize = +d.IndustrySize; // Assuming you have a property for industry size
    });
  
    // Group data by 'Industry' and calculate average age and total industry size
    const avgAgeAndSizeByIndustry = d3.nest()
        .key(d => d.Industry)
        .rollup(values => ({
            AverageAge: d3.mean(values, d => d.Age),
            TotalSize: d3.sum(values, d => d.IndustrySize)
        }))
        .entries(filteredData);
  
    // Bubble chart setup
    const margin = { top: 60, right: 30, bottom: 90, left: 90 };
    const width = 580 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    const svg = d3.select("#graph7")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleBand()
        .range([0, width])
        .domain(avgAgeAndSizeByIndustry.map(d => d.key))
        .padding(0.1);
  
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(avgAgeAndSizeByIndustry, d => d.value.AverageAge)]);
  
    const r = d3.scaleLinear()
        .range([5, 25]) // Adjust bubble size range as needed
        .domain([0, d3.max(avgAgeAndSizeByIndustry, d => d.value.TotalSize)]);
  
    // Color scale based on average age
    const color = d3.scaleSequential()
        .domain([d3.min(avgAgeAndSizeByIndustry, d => d.value.AverageAge), d3.max(avgAgeAndSizeByIndustry, d => d.value.AverageAge)])
        .interpolator(d3.interpolateViridis); // You can change the color scheme as needed
  
    svg.selectAll("circle")
        .data(avgAgeAndSizeByIndustry)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.key) + x.bandwidth() / 2)
        .attr("cy", d => y(d.value.AverageAge))
        .attr("r", d => r(d.value.TotalSize))
        .attr("fill", d => color(d.value.AverageAge)) // Color based on average age
        .attr("opacity", 0.7);
  
    // Add dollar sign inside each circle
    svg.selectAll("text")
        .data(avgAgeAndSizeByIndustry)
        .enter()
        .append("text")
        .text("$")
        .attr("x", d => x(d.key) + x.bandwidth() / 2)
        .attr("y", d => y(d.value.AverageAge))
        .attr("font-size", "12px") // Adjust font size as needed
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white"); // Color of the dollar sign
  
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "9px");
  
    svg.append("g")
        .call(d3.axisLeft(y));
  
    // Title on top middle
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Billionaires Average Age per Industry");
  
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Age");
  
    // svg.append("text")
    //     .attr("y", height + margin.top)
    //     .attr("x", width / 2)
    //     .attr("dy", "1em")
    //     .style("text-anchor", "middle")
    //     .style("font-size", "16px")
    //     .text("Billionaires Average Age per Industry"); // Title
  
    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
  
    svg.selectAll("circle")
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Industry: ${d.key}<br>Average Age: ${d.value.AverageAge.toFixed(2)}<br>Total Size: ${d.value.TotalSize}`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
  };
  