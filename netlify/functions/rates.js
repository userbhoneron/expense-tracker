const https = require("https");

exports.handler = async function () {
    return new Promise((resolve) => {

        const url = "https://api.currencyfreaks.com/latest?apikey=4058d2d572f04303bcaec84ac205ea35";

        https.get(url, (res) => {
            let data = "";

            res.on("data", chunk => data += chunk);

            res.on("end", () => {
                try {
                    const json = JSON.parse(data);

                    resolve({
                        statusCode: 200,
                        body: JSON.stringify({
                            rates: {
                                USD: 1,
                                THB: parseFloat(json.rates.THB),
                                MMK: parseFloat(json.rates.MMK)
                            }
                        })
                    });

                } catch (e) {
                    resolve({
                        statusCode: 500,
                        body: JSON.stringify({ error: "Parse error" })
                    });
                }
            });

        }).on("error", () => {
            resolve({
                statusCode: 500,
                body: JSON.stringify({ error: "Request failed" })
            });
        });

    });
};
