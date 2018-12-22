const {OAuth2Client} = require('google-auth-library');
const config = require('../config/config');

const client = new OAuth2Client(config.google.clientID);
module.exports = async function verify(request, response, next) {
    let token = request.body.token;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.google.clientID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    request.userInfo = payload;
    console.log(payload);
    // const userid = payload['sub'];

    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    next();
};
// verify().catch(console.error);