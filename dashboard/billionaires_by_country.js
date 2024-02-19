function billionairesByCountry(selectedCountry){
    console.log(selectedCountry, billionairesData)
    // Get a reference for the billionaires-by-country-chart div
    const byCountryDiv = document.getElementById('billionaires-by-country-chart');

    byCountryDiv.innerHTML = '';

    // Filter data by selected country
    const billionairesInCountry = billionairesData.filter(obj => obj["Country"] === selectedCountry);
  
    billionairesInCountry.forEach(billionaire => {
        const listItem = document.createElement('a');
        listItem.href = '#'; 
        listItem.classList.add('list-group-item', 'list-group-item-action');
        listItem.textContent = billionaire.Name;
        byCountryDiv.appendChild(listItem);
    });
}
