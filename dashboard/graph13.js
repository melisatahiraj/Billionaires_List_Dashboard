function graph13(selectedCountry){
    console.log(selectedCountry, billionairesData)
    // Get a reference for the billionaires-by-country-chart div
    const graph13Div = document.getElementById('graph13');

    // byCountryDiv.innerHTML = '';

    // Filter data by selected country
    let billionairesInCountry = [];
    // Check for All
    if (selectedCountry === 'All') {
        billionairesInCountry = billionairesData;
    } else {
        billionairesInCountry = billionairesData.filter(obj => obj["Country"] == selectedCountry);
    }

    // Calculate the number of billionaires
    const numberOfBillionaires = billionairesInCountry.length;
    // const totalNetWorth = billionairesInCountry.reduce((sum, billionaire) => sum + parseFloat(billionaire["Net Worth(In Billions)"]), 0);
    const averageAge = (billionairesInCountry.reduce((sum, billionaire) => sum + (billionaire.Age || 0), 0) / numberOfBillionaires).toFixed(0);

    const formattedText = `
        <div style="font-size: 12px;">
            <div class="text-center">Average Age</div>
            <div class="text-center" style="font-size: 26px;">${averageAge}</div>
        </div>
    `;

    // Display the formatted text
    graph13Div.innerHTML = formattedText;
  
}