const requestClient = require('request');

module.exports = {

    get(url) {

        return new Promise( (resolve, reject) => {
            requestClient.get(url, (err, response, body) => {
                if(err) {
                    reject(err);
                } else  {
                    
                    try {
                        resolve(JSON.parse(body));
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        });
    }
};