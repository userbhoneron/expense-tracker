exports.handler = async function () {
    try {
        const res = await fetch("https://api.currencyfreaks.com/latest?apikey=4058d2d572f04303bcaec84ac205ea35");

        const data = await res.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                rates: {
                    USD: 1,
                    THB: parseFloat(data.rates.THB),
                    MMK: parseFloat(data.rates.MMK)
                }
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "API failed"
            })
        };
    }
};
