const url = require('url');
const requestClient = require('./request-promise');

async function vkAuth(request, response, next) {

    const query = url.parse(request.url, true).query;

    if (query.code) {
        const userOAuthInfo = await requestClient.get(`https://oauth.vk.com/access_token?client_id=6789814&client_secret=miyVbA4CkJbORQfpxCWB&redirect_uri=http://localhost:3000/api/auth/vk&code=${query.code}`);
        
        if ( userOAuthInfo.access_token ) {
            let additionalInfo = await requestClient.get(`https://api.vk.com/method/users.get?fields=photo_100&access_token=${userOAuthInfo.access_token}&v=5.92`);
            
            if (additionalInfo.response && Array.isArray(additionalInfo) && additionalInfo.response[0].id) {
                additionalInfo = additionalInfo.response[0];
                delete additionalInfo.id;
                request.userOAuthInfo = Object.assign({}, userOAuthInfo, additionalInfo);
                next();
            }
        }
        
        // request.userOAuthInfo = userOAuthInfo;
        // next();
        
    }
}

function sentFakeVkPage(request, response, next) {
    
    const fakePage =
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Fake Vk Page</title> 
        <script>
            if (window.opener) {
                window.opener.postMessage('${JSON.stringify(request.userOAuthInfo)}', window.location.origin);
                window.close();
            }
        </script>  
    </head>
    <body>
    </body>
    </html>`

    response.setHeader('Content-Type', 'text/html');
    response.end(fakePage);
    next();
}

module.exports = {
    vkAuth,
    sentFakeVkPage
};