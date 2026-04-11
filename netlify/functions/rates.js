let rates = {};

async function loadRates() {
    const res = await fetch("/.netlify/functions/rates");
    const data = await res.json();

    rates = data.rates;
}
