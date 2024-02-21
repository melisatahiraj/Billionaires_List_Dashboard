function graph11(selectedCountry){
    console.log(selectedCountry, billionairesData)
    // Get a reference for the billionaires-by-country-chart div
    const graph11Div = document.getElementById('graph11');

    // byCountryDiv.innerHTML = '';

    let billionairesInCountry = [];
    // Check for All
    if (selectedCountry === 'All') {
        billionairesInCountry = billionairesData;
    } else {
        billionairesInCountry = billionairesData.filter(obj => obj["Country"] == selectedCountry);
    }

    // Calculate the number of billionaires, total net worth, and average age
    const numberOfBillionaires = billionairesInCountry.length;
    // const totalNetWorth = billionairesInCountry.reduce((sum, billionaire) => sum + parseFloat(billionaire["Net Worth(In Billions)"]), 0);
    // const averageAge = billionairesInCountry.reduce((sum, billionaire) => sum + (billionaire.Age || 0), 0) / numberOfBillionaires;

    const formattedText = `
        <div style="font-size: 12px;">
            <div class="text-center">Number of Billionaires</div>
            <div class="text-center" style="font-size: 26px;">${numberOfBillionaires.toLocaleString()}</div>
        </div>
    `;

    // Display the formatted text
    graph11Div.innerHTML = formattedText;
  
}