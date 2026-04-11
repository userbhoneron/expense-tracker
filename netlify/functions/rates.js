exports.handler = async function () {
    try {
        const res = await fetch(
            `https://api.currencyfreaks.com/latest?apikey=${process.env.API_KEY}`
        );

        const data = await res.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                rates: {
                    USD: 1,
                    MMK: parseFloat(data.rates.MMK),
                    THB: parseFloat(data.rates.THB)
                },
                date: data.date
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "API failed",
                details: error.message
            })
        };
    }
};
