function graph1(selectedCountry){
    console.log('graph1');
    console.log(selectedCountry, billionairesData);

     // Get a reference for the graph div
     //const graphChartDiv = document.getElementById('graph1');
     //graphChartDiv.innerHTML = '';

    // TODO: Graph code goes here

    let totalBillionairesCount = 0;

    billionairesData.forEach((billionaire) => {
        let country = billionaire['Country'];
        let age = billionaire['Age'];

        if (country === selectedCountry && age !== 'N/A') {
           totalBillionairesCount++; 
        }
    });

    let totalBillionaires = totalBillionairesCount;

    let filteredData = billionairesData.filter(sample => sample['Country'] === selectedCountry && sample['Age'] !== 'N/A');
    console.log(filteredData);




    function pieChart(dataValues) {

        let ageGroups = {
            '10-19': 0,
            '20-29': 0,
            '30-39': 0,
            '40-49': 0,
            '50-59': 0,
            '60-69': 0,
            '70-79': 0,
            '80-89': 0,
            '90+': 0,
        };


        dataValues.forEach(({Age}) => {
            let ageNum = parseFloat(Age);
            if (ageNum >= 90) {
                ageGroups['90+']++;
            } else {
                let ageGroup = Math.floor(ageNum / 10) * 10;
                let ageGroupLabel = `${ageGroup}-${ageGroup + 9}`;
                ageGroups[ageGroupLabel]++;
            }
        });


        //let labels = Object.keys(ageGroups);
        //let values = Object.values(ageGroups);


        let ageGroupOrder = ['80-89', '70-79', '60-69', '50-59', '40-49', '30-39', '20-29', '10-19', '90+'];


        let labels = [];
        let values = [];
        let colors = [];


        let fixedColors = {
            '10-19': '#628f70',
            '20-29': '#003333',
            '30-39': '#0f8f84',
            '40-49': '#529191',
            '50-59': '#4fb6b6',
            '60-69': '#01d9d9',
            '70-79': '#43b995',
            '80-89': '#00ae79',
            '90+': '#00874c',
        };


        // ageGroupOrder.forEach(label => {
        //     if (ageGroups[label] > 0 && label !== '90+') {
        //         labels.push(label);
        //         values.push(ageGroups[label]);
        //         colors.push(fixedColors[label]);
        //     }
        // });

        // if (ageGroups['90+'] > 0) {
        //     labels.push('90+');
        //     values.push(ageGroups['90+']);
        //     colors.push(fixedColors['90+']);
        // }

        ageGroupOrder.forEach(label => {
            if (label !== '90+') {
                labels.push(label);
                values.push(ageGroups[label]);
                colors.push(fixedColors[label]);
            }
        });


        if (ageGroups['90+'] > 0) {
            if (ageGroups['90+'] > 0) {
                labels.unshift('90+');
                values.unshift(ageGroups['90+']);
                colors.unshift(fixedColors['90+']);
            } else {
                labels.push('90+');
                values.push(ageGroups['90+']);
                colors.push(fixedColors['90+']);
            }
        }


        // for (let label in ageGroups) {
        //     if (ageGroups[label] > 0) {
        //         labels.push(label);
        //         values.push(ageGroups[label]);
        //     }
        // }


        // Object.keys(ageGroups)
        //     .sort((a, b) => ageGroups[b] - ageGroups[a])
        //     .forEach(label => {
        //         if (ageGroups[label] > 0) {
        //             labels.push(label);
        //             values.push(ageGroups[label]);
        //             colors.push(fixedColors[label])
        //         }
        //     });


        // legendOrder.forEach(label => {
        //     if (ageGroups[label] > 0) {
        //         labels.push(label);
        //         values.push(ageGroups[label]);
        //         colors.push(fixedColors[label]);
        //     }
        // });


        // let data = labels.map((label, i) => ({label, value: values[i], color: colors[i]}));


        // data.sort((a, b) => b.label.localeCompare(a.label));


        // let sortedLabels = data.map(d => d.label);
        // let sortedValues = data.map(d => d.value);
        // let sortedColors = data.map(d => d.color);


        let pieData = [{
            values: values,
            labels: labels,
            type: 'pie',
            name: 'Age Distribution',
            marker: {
                colors: colors,
                line: {
                    color: 'black',
                    width: 1
                }
            },
            hoverinfo: 'label+value',
            textinfo: 'percent',
            textposition: 'inside',
            hole: 0.5,
            //pull: pullValues,
        }];


        let pieLayout = {
            //title: '<b>Age Distribution</b>',
            margin: {
                l: 50,
                t: 20,
                r: 30,
                b: 70,
            },
            height: 650,
            width: 650,
            annotations: [
                {
                    font: {size: 14},
                    showarrow: false,
                    text: '<b>Age Distribution</b> <br> <b><i> Total Billionaires: ' + totalBillionaires + '</i></b>',
                    x: 0.5,
                    y: 0.5
                }
            ],
            showlegend: true,
            legend: {
                // orientation: 'h'
                x: 1.5,
                xanchor: 'right',
                y: 1,
                yanchor: 'top',
                bordercolor: '#000',
                borderwidth: 1
            }
        };

        Plotly.newPlot('pie', pieData, pieLayout);
    }

    
    pieChart(filteredData);

}   
