function graph1(selectedCountry){
    console.log('graph1');
    console.log(selectedCountry, billionairesData);

     // Get a reference for the graph div
    //  const graphChartDiv = document.getElementById('graph1');
    //  graphChartDiv.innerHTML = '';

    // TODO: Graph code goes here
    let totalBillionairesCountry = {};

    billionairesData.forEach((billionaire) => {
        let country = billionaire['Country'];
        totalBillionairesCountry[country] = (totalBillionairesCountry[country] || 0) + 1;
    });

    let totalBillionaires = totalBillionairesCountry[selectedCountry];

    let filteredData = billionairesData.filter(sample => sample['Country'] === selectedCountry);
    console.log(filteredData);




    function pieChart(dataValues) {

    
        let ageGroups = {
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
            let ageGroup = Math.floor(Age / 10) * 10;
            let ageGroupLabel = `${ageGroup}-${ageGroup + 9}`;
            ageGroups[ageGroupLabel]++;
        });


        let labels = Object.keys(ageGroups);
        let values = Object.values(ageGroups);


        let pieData = [{
            values: values,
            labels: labels,
            type: 'pie',
            name: 'Age Distribution',
            marker: {
                colors: ['#c05956', '#d46547', '#e9861a', '#e1b525', '#76745c', '#d8699e', '#c2ccd8', '#c04b65', '#f6dce9'],
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
                t: 30,
                r: 30,
                b: 30,
            },
            height: 500,
            width: 500,
            annotations: [
                {
                    font: {size: 14.5},
                    showarrow: false,
                    text: '<b>Age Distribution</b> <br> <b><i> Total Billionaires: ' + totalBillionaires + '</i></b>',
                    x: 0.5,
                    y: 0.5
                }
            ],
            showlegend: true,
        };

        Plotly.newPlot('pie', pieData, pieLayout);
    }

    
    pieChart(filteredData);

}   
