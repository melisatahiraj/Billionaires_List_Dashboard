function graph12(selectedCountry){
    console.log(selectedCountry, billionairesData)
    // Get a reference for the billionaires-by-country-chart div
    const graph12Div = document.getElementById('graph12');

    // byCountryDiv.innerHTML = '';

    // Filter data by selected country
    let billionairesInCountry = [];
    // Check for All
    if (selectedCountry === 'All') {
        billionairesInCountry = billionairesData;
    } else {
        billionairesInCountry = billionairesData.filter(obj => obj["Country"] == selectedCountry);
    }

    // Calculate the total net worth, and average age
    const totalNetWorth = billionairesInCountry.reduce((sum, billionaire) => sum + parseFloat(billionaire["Net Worth(In Billions)"]), 0);
    // const averageAge = billionairesInCountry.reduce((sum, billionaire) => sum + (billionaire.Age || 0), 0) / numberOfBillionaires;

    const formattedText = `
        <div style="font-size: 12px;">
            <div class="text-center">Total Net Worth</div>
            <div class="text-center" style="font-size: 26px;">${totalNetWorth.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })} B</div>
        </div>
    `;

    // Display the formatted text
    graph12Div.innerHTML = formattedText;
  
}