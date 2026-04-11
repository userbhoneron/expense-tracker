exports.handler = async function () {
    try {
        const res = await fetch(
            `https://api.currencyfreaks.com/latest?apikey=${process.env.API_KEY}`
        );

        const data = await res.json();

        // 🧠 DEBUG LOG (important)
        console.log("FULL API RESPONSE:", data);

        // ❌ If API failed or structure wrong
        if (!data || !data.rates) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Invalid API response",
                    data: data
                })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                rates: {
                    USD: 1,
                    MMK: parseFloat(data.rates["MMK"] || 0),
                    THB: parseFloat(data.rates["THB"] || 0)
                },
                date: data.date || null
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
