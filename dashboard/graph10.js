function graph10(selectedCountry){
    console.log(selectedCountry, billionairesData)
    // Get a reference for the billionaires-by-country-chart div
    const graph10Div = document.getElementById('graph10');

    // byCountryDiv.innerHTML = '';

    let billionairesInCountry = [];
    // Check for All
    if (selectedCountry === 'All') {
        billionairesInCountry = billionairesData;
    } else {
        billionairesInCountry = billionairesData.filter(obj => obj["Country"] == selectedCountry);
    }

    // Extract unique industries from the filtered dataset
    const uniqueIndustriesInSelectedCountry = [...new Set(billionairesInCountry.map(b => b.Industry))];

    // Get the count of unique industries in the selected country
    const numberOfIndustriesInSelectedCountry = uniqueIndustriesInSelectedCountry.length;

    const formattedText = `
        <div style="font-size: 12px;">
            <div class="text-center">Total Industries</div>
            <div class="text-center" style="font-size: 26px;">${numberOfIndustriesInSelectedCountry}</div>
        </div>
    `;

    // Display the formatted text
    graph10Div.innerHTML = formattedText;
  
}